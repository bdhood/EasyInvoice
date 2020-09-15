"""
Step definitions for login.feature
"""

from pytest_bdd import scenarios, given, then, when, parsers

from ..interactions.base.element import element_search, element_from_xpath, element_click
from ..interactions.base.control import control_click, control_text

from time import sleep

scenarios('../features/invoice.feature')

@when('I click create invoice')
def when_i_click_create_invoice(context):
    control_click(context.driver, 'dropdown-basic')
    control_click(context.driver, 'Create invoice')

@when("I click generate")
def when_i_click_add(context):
    control_click(context.driver, 'Generate')
