from django_elasticsearch_dsl import fields
from elasticsearch_dsl import NestedFacet, TermsFacet

from factory.catalog.models import Category


def preparation_query_params(query_params: dict, facets: dict) -> dict:
    """
    Return dict with parameters which can use in filters for ProductFacetedSearch
    """
    filters = {}
    for key, value in query_params.items():
        # skip if query params not contains in facets
        if not facets.get(key, 0):
            continue
        filters[key] = value.lower().split(',')
    return filters


def get_all_attributes_schemas() -> list:
    """
    Merging schema_attributes in all categories
    schema_attributes: contains name and type each attribute which are stored in JSONField
    """
    schema_attributes = []
    categories = Category.objects.all()
    for category in categories:
        schema_attributes.extend(category.schema_attributes)
    return schema_attributes


def generate_properties_for_json_text_fields() -> dict:
    """
    Return properties for all JSON fields which have type 'text'
    and sets the parameter fielddata=True
    """
    properties = {}
    for attr in get_all_attributes_schemas():
        if attr['type'] == 'text':
            properties[attr['name']] = fields.TextField(fielddata=True)
    return properties


def generate_facets(schema: list) -> dict:
    """Return dict with NestedFacet for JSONField"""
    facets = {
        'category': NestedFacet('category', TermsFacet(field="category.id")),
    }
    for attribute in schema:
        terms_facet = TermsFacet(field=f"attributes.{attribute['name']}")
        facets[attribute['name']] = NestedFacet('attributes', terms_facet)
    return facets


def get_options_in_needed_format(facets) -> list:
    """
    Return options list in needed format for frontend app
    """
    options = []
    for facet_name in facets:
        element = {}
        element["name"] = facet_name
        element["value"] = []
        for (value, count, selected) in facets[facet_name]:
            element["value"].append({
                "name": value,
                "is_chosen": selected,
                "quantity": count
            })
        options.append(element)
    return options


def extract_fields_from_faceted_response(response) -> list:
    products = []
    for product in response.hits:
        products.append({
            'id': product.id,
            "name": product.name,
            "price": product.price,
            "sale": product.sale,
            'images': product.images.to_dict(),
            "rating_avg": product.rating_avg,
        })
    return products
