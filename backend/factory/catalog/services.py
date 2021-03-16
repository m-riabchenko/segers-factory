from collections import Counter
from django.db.models import Q

from factory.catalog.models import Product


def format_attr_params_to_dict(value) -> dict:
    """
    Format attributes string params to dict
    """
    params = [item for item in value.split("/") if item.strip()]
    return dict(map(lambda x: x.split("="), params))


def get_queries_by_attr_params(params: dict):
    """
    Get queries for attributes field filter
    """
    queries = Q()
    for key, value in params.items():
        query = Q()
        for item in value.split(","):
            query |= Q(attributes__contains={key: item})
        queries &= query
    return queries


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


def get_filters_data(queryset) -> dict:
    """
    Get all variant attributes filter by category
    """
    data = {}
    for product in queryset:
        data = merge_dict(data, product.attributes)
    return data


def count_products_each_attr(queryset) -> dict:
    """
    Get quantity products each attributes by queryset
    """
    data = {}
    for product in queryset:
        data = merge_dict(data, product.attributes)
    count_products = Counter()
    for key in data:
        count_products += Counter(data[key].split(','))
    return count_products


def get_chosen_list(formatted_attr):
    chosen_list = []
    for chosen_item in formatted_attr.values():
        chosen_list.extend(chosen_item.split(','))
    return chosen_list


def get_options_for_product_filter(queryset, attr, category_id):
    products_by_category = Product.objects.filter(category_id=category_id)
    qty_products_in_category = count_products_each_attr(products_by_category)
    qty_products_in_filter_queryset = count_products_each_attr(queryset)
    all_products_attr_in_category = get_filters_data(products_by_category)
    is_chosen = []

    if attr is None:
        products_quantity = qty_products_in_category
    else:
        formatted_attr = format_attr_params_to_dict(attr)
        is_chosen = get_chosen_list(formatted_attr)
        values = list(formatted_attr.keys())
        if len(values) == 1:
            # if in query params only one attribute is specified
            qty_products_per_attr = Counter(all_products_attr_in_category[values[0]].split(','))
            products_quantity = {**qty_products_in_filter_queryset, **qty_products_per_attr}
        else:
            products_quantity = qty_products_in_filter_queryset
    return create_options(products_quantity, is_chosen, all_products_attr_in_category)


def create_options(products_quantity: dict, is_chosen: list, all_attributes) -> list:
    options_list = []
    for key in all_attributes:
        # set unique value
        value = set(all_attributes[key].split(","))
        options_list.append({
            "option_name": key,
            "option_value": [
                {
                    "option_value_name": attr_name,
                    "is_chosen": True if attr_name in is_chosen else False,
                    "products_quantity": products_quantity.get(attr_name, 0),
                } for attr_name in value
            ]
        })
    return options_list
