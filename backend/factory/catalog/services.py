from django.db.models import Q
from django_filters import rest_framework as filters
from factory.catalog.models import Product


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    order_by = filters.CharFilter(method='order_by_product')
    attr = filters.CharFilter(field_name="attributes", method='filter_product_attributes')

    def filter_product_attributes(self, queryset, name, value):
        """
        Filter product by attributes which saved in json field
        """
        queries = Q()
        query_params_list = [item for item in value.split("/") if item.strip()]
        for key, value_ in dict(map(lambda x: x.split("="), query_params_list)).items():
            query = Q()
            for item in value_.split(","):
                query |= Q(attributes__variant__contains=[{key: item}])
            queries &= query
        return queryset.filter(queries)

    def order_by_product(self, queryset, name, value):
        """
        Filter order_by
        """
        if value == "low-price":
            return queryset.order_by("price")
        elif value == "high-price":
            return queryset.order_by("-price")
        return queryset

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price']


def merge_dict(first_dict, second_dict) -> dict:
    """
    Merge two dict without loss values
    """
    for key, value in second_dict.items():
        if first_dict.get(key):
            first_dict[key] = str(first_dict[key]) + ',' + str(value)
        else:
            first_dict[key] = value
    return first_dict


def get_filters_data(category_id: int) -> dict:
    """
    Get all variant attributes filter by category
    """
    data = {}
    products = Product.objects.filter(category__id=category_id)
    for product in products:
        for item in product.attributes["variant"]:
            data = merge_dict(data, item)
    for key in data:
        data[key] = list(set(data[key].split(",")))
    return data
