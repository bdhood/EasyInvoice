'''
handles creating/configuring/destroying the selenium webdriver
'''

import pytest

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

@pytest.fixture(scope="class")
def driver(settings):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("no-sandbox")
    capabilities = DesiredCapabilities.CHROME.copy()
    capabilities['version'] = '85.0.4183.83'
 
    chrome_driver = webdriver.Remote(
        command_executor="http://" + settings.driver_address + ":4444/wd/hub",
        desired_capabilities=capabilities,
        options=chrome_options
    )

    with chrome_driver:
        yield chrome_driver
