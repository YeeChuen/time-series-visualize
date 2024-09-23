from repository.RunProjectRepository import (
    get_project,
    get_project_by_id,
    create_project,
    delete_project_by_id,
)


def get_project_service():
    return get_project()


def create_project_service(new_project):
    return create_project(new_project)


def get_project_by_id_service(id):
    return get_project_by_id(id)


def delete_project_by_id_service(id):
    return delete_project_by_id(id)
