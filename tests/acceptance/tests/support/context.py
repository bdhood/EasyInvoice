'''
this class provides a context for each step in a scenario
it is reset after every test
'''

import pytest

# pylint: disable=too-few-public-methods
class Context:
    def __init__(self, settings, driver):
        self.settings = settings
        self.driver = driver

@pytest.fixture(scope="class")
def context(settings, driver):
    return Context(settings, driver)
