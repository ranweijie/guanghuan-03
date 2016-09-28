#!/usr/bin/python
# coding=utf-8

import os
import json

import logging
from logging.handlers import RotatingFileHandler

import requests

from eve import Eve


#
# 日志配置
#
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S')

Rthandler = RotatingFileHandler('eve.log', maxBytes=10 * 1024 * 1024, backupCount=5)
Rthandler.setLevel(logging.DEBUG)
Rtformatter = logging.Formatter('%(name)-12s: %(levelname)-8s %(message)s')
Rthandler.setFormatter(Rtformatter)
logging.getLogger('').addHandler(Rthandler)


#
# 获取 MONGO URI 的逻辑顺序 :
# 1. Form environment variable "MONGO_URI"
# 2. From VAULT if following variables are provided in system environment:
# VAULT_ADDR & VAULT_TOKEN
# MONGO_URI_PATH_IN_VAULT ( eg: '/v1/secret/HNA-Brightness/prod/mongo/url' )
# 3. Default mongo uri : 'mongodb://localhost:27017/brightness'
#

MONGO_URI_DEFAULT = 'mongodb://localhost:27017/brightness'


def get_mongo_uri_from_vault(address, token, path):
    logging.info('retriving Mongo URI with vault info: {0}{1}'.format(address, path))
    vault_response = requests.get( \
        address + path, \
        headers={'X-Vault-Token': token}) \
        .json()
    return vault_response['data']['value']


def get_mongo_uri():
    vault_address = os.environ.get('VAULT_ADDR')
    vault_token = os.environ.get('VAULT_TOKEN')
    vault_path = os.environ.get('MONGO_URI_PATH_IN_VAULT')
    mongo_uri = MONGO_URI_DEFAULT
    if vault_address and vault_token and vault_path:
        mongo_uri = get_mongo_uri_from_vault(vault_address, vault_token, vault_path)
    logging.info('using Mongo URI = {0}'.format(mongo_uri))
    return mongo_uri


#
# API Endpoint定义 & EVE runner
#

my_settings = {

    'MONGO_URI': get_mongo_uri(),

    'DOMAIN': {

        'attachment': {
            'url': 'attachment',
            'resource_title': '[POST /attachment] to upload file; [GET /attachment/<file_id>] to retrive filename, type and download url; [DELETE /attachment/<file_id>] to delete file',
            'resource_methods': ['POST','GET'],
            'item_methods': ['GET', 'DELETE'],
            'schema': {
                'file': {'type': 'media'},
            }
        },

        'project': {
            'url': 'project',
            'resource_methods': ['POST'],
            'item_methods': ['GET', 'PATCH', 'PUT'],
            'schema': {
                'status': {'type': 'string',
                           'allowed': ["finished", "preparing", "proceeding", "archived", "cancelled"]},
                'finance': {
                    'type': 'dict',
                    'schema': {
                        'doc': {
                            'type': 'list',
                            'schema': {
                                'type': 'objectid',
                                'data_relation': {'resource': 'attachment', 'embeddable': False}
                            }
                        },
                    },
                },
            },
        },
        'projectPrecheck': {
            'url': 'project/precheck',
            'resource_title': '[GET project/precheck] to retrive project precheck',
            'resource_methods': ['GET'],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'precheck': 1}},
            'hateoas': False,
        },
        'projectInvestigation': {
            'url': 'project/investigation',
            'resource_title': '[GET project/investigation] to retrive project investigation',
            'resource_methods': ['GET'],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'investigation': 1}},
            'hateoas': False,
        },
        'projectLaunchCeremony': {
            'url': 'project/launch_ceremony',
            'resource_title': '[GET project/launch_ceremony] to retrive project launch_ceremony',
            'resource_methods': ['GET'],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'launch_ceremony': 1}},
            'hateoas': False,
        },
        'projectExperience': {
            'url': 'project/experience',
            'resource_title': '[GET project/experience] to retrive project experience',
            'resource_methods': ['GET'],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'experience': 1}},
            'hateoas': False,
        },
        'projectInfo': {
            'url': 'project/info',
            'resource_title': '[GET project/info] to retrive project info',
            'resource_methods': ['GET'],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'info': 1}},
            'hateoas': False,
        },
        'projectFinance': {
            'url': 'project/finance',
            'resource_title': '[GET project/finance] to retrive project finance',
            'resource_methods': ['GET'],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'finance': 1}},
            'hateoas': False,
            'schema': {
                'finance': {
                    'type': 'dict',
                    'schema': {
                        'doc': {
                            'type': 'list',
                            'schema': {
                                'type': 'objectid',
                                'data_relation': {'resource': 'attachment', 'embeddable': True}
                            }
                        },
                    },
                },
            },
        },
        'projectStatus': {
            'url': 'project/status',
            'resource_title': '[GET project/status/<project_id>] to retrive project status',
            'resource_methods': [],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'status': 1}},
            'hateoas': False,
        },
        'projectCuredNumbers': {
            'url': 'project/cured_numbers',
            'resource_title': '[GET project/cured_numbers/<project_id>] to retrive project cured_numbers',
            'resource_methods': [],
            'item_methods': ['GET', 'PATCH'],
            'datasource': {'source': 'project', 'projection': {'cured_numbers': 1}},
            'hateoas': False,
        },
        'basicProject': {
            'url': 'basic_project',
            'resource_title': '[GET project/<project_id>] to generate project basic information',
            'resource_methods': ['GET'],
            'item_methods': ['GET'],
            'datasource': {'source': 'project', 'projection': {'status': 1, 'info.location': 1, 'info.name': 1,
                                                               'info.schedule.start_date': 1,
                                                               'info.schedule.end_date': 1,
                                                               'cured_numbers': 1}},
            'hateoas': False,
        },
        'project_participant': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/project_participant',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False}
                }
            },
        },

        'project_schedule': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/project_schedule',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                }
            },
        },

        'project_progress': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/project_progress',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                }
            },
        },

        'project_patient_info': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/project_patient_info',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                }
            },
        },

        'project_feedback': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/project_feedback',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                }
            },
        },

        'investigation_hotel': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/investigation_hotel',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                },
                'photos': {
                    'type': 'list',
                    'schema': {
                        'type': 'objectid',
                        'data_relation': {'resource': 'attachment', 'embeddable': True}
                    }
                },
            },
        },

        'investigation_hospital': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/investigation_hospital',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                },
                'photos': {
                    'type': 'list',
                    'schema': {
                        'type': 'objectid',
                        'data_relation': {'resource': 'attachment', 'embeddable': True}
                    }
                },
            },
        },

        'investigation_trip': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/investigation_trip',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                }
            },
        },

        'finance_usage': {
            'url': 'project/<regex("[a-f0-9]{24}"):project_id>/finance_usage',
            'resource_methods': ['GET', 'POST'],
            'item_methods': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'schema': {
                'project_id': {
                    'type': 'objectid',
                    'data_relation': {'resource': 'project', 'embeddable': False},
                }
            },
        },
    },

    'RESOURCE_METHODS': ['GET', 'POST', 'DELETE'],
    'ITEM_METHODS': ['GET', 'PATCH', 'PUT', 'DELETE'],
    'XML': False,
    'IF_MATCH': False,
    'ALLOW_UNKNOWN': True,
    'BANDWIDTH_SAVER': False,
    'RETURN_MEDIA_AS_URL': True,
    'RETURN_MEDIA_AS_BASE64_STRING': False,
    'EXTENDED_MEDIA_INFO': ['content_type', 'name', 'length'],
    'DEBUG': False,
}

app = Eve(settings=my_settings)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
