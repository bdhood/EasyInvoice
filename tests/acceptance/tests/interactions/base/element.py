'''
handles all calls to selenium's WebElement
see https://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.remote.webelement
'''

from time import sleep
from selenium.webdriver.common.by import By

def element_from_xpath(driver, xpath, index=0, retry=10):
    while retry > 0:
        elements = driver.find_elements(By.XPATH, xpath)
        if len(elements) > index:
            return elements[index]
        sleep(1)
        retry -= 1
    return None

def element_search(driver, search, index=0, retry=10):
    return element_from_xpath(
        driver, 
        f'//*[contains(text(), "{search}") or @placeholder="{search}" or @id="{search}"]',
        index=index,
        retry=retry)


def element_click(element, retry=10):
    try:
        element.click()
        sleep(0.5)
    # pylint: disable=broad-except
    except Exception as err:
        if retry == 0:
            raise err
        print('Failed to click element; ' + str(element))
        sleep(1)
        element_click(element, retry - 1)

def element_type(element, text):
    element.send_keys(text)

def element_get_active(driver):
    return driver.switch_to.active_element
