from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import FacetedSearch, TermsFacet, A, RangeFacet, FacetedResponse, NestedFacet
from factory.catalog.models import Product
from factory.catalog.services import generate_properties_for_json_text_fields, \
    generate_facets, get_all_attributes_schemas


@registry.register_document
class ProductDocument(Document):
    attributes = fields.NestedField(properties=generate_properties_for_json_text_fields())
    category = fields.NestedField(
        properties={"id": fields.IntegerField(), "name": fields.TextField(fielddata=True)})
    images = fields.NestedField()

    def get_queryset(self):
        return Product.objects.filter(available=True).prefetch_related('image_set')

    def prepare_attributes(self, instance):
        return instance.attributes

    def prepare_category(self, instance):
        return {
            "id": instance.category.id,
            "name": instance.category.name
        }

    def prepare_images(self, instance):
        response_obj = {}
        for img_obj in instance.image_set.all():
            response_obj[img_obj.name] = img_obj.image.url
        return response_obj

    class Index:
        name = 'products'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }

    class Django:
        model = Product
        fields = [
            'id',
            'name',
            'price',
            'sale',
            'rating_avg',
        ]


class ProductFacetedSearch(FacetedSearch):
    doc_types = [ProductDocument, ]
    index = 'products'
    fields = ['name']

    facets = generate_facets(schema=get_all_attributes_schemas())

    def query(self, search, query):
        if not query:
            return search
        if query.get('search', 0):
            search = search.query("query_string", fields=self.fields, query=f"*{query['search']}*")
        if 'price' in query:
            return search.filter("range", price={"gte": query['price']['min_price'],
                                                 "lte": query['price']['max_price']})

    def aggregate(self, search):
        super().aggregate(search)
        search.aggs.bucket('max_price', 'max', field='price')
        search.aggs.bucket('min_price', 'min', field='price')
