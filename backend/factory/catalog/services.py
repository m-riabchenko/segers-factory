from factory.catalog.models import Product


def merge_dict(dict1, dict2) -> dict:
    for k, v in dict2.items():
        if dict1.get(k):
            dict1[k] = dict1[k] + ',' + v
        else:
            dict1[k] = v
    return dict1


def get_filters_data(category_id: int) -> dict:
    data = {}
    products = Product.objects.filter(category__id=category_id)
    for product_ in products:
        for item in product_.attributes["variant"]:
            data = merge_dict(data, item)

    for key in data:
        data[key] = list(set(data[key].split(",")))

    return data
