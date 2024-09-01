from repository.RunClientRepository import (
    get_client,
    get_client_by_id,
    create_client,
    delete_client_by_id,
)


def get_client_service():
    return get_client()


def create_client_service(new_client):
    return create_client(new_client)


def get_client_by_id_service(id):
    return get_client_by_id(id)


def delete_client_by_id_service(id):
    return delete_client_by_id(id)
