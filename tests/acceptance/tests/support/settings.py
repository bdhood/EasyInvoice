'''
settings for all tests. accessible from context.settings
loads from environmental variables
'''

import os
import pytest
from random import randint

# pylint: disable=too-few-public-methods
class Settings:
    def __init__(self):
        self.base_url = os.environ['EASY_INVOICE_BASE_URL']
        self.driver_address = os.environ['WEBDRIVER_ADDRESS']
        self.email = 'test@test.com'
        self.password = 'pass'
        self.random_email = f"test+{randint(100000,999999)}@test.com"

@pytest.fixture(scope="session")
def settings():
    return Settings()
