"""
Step definitions for login.feature
"""

import json

from pytest_bdd import scenarios, given, then, when, parsers

from ..interactions.base.element import element_search, element_from_xpath, element_click
from ..interactions.base.control import control_click, control_text

scenarios('../features/items.feature')

@when('I click add expense')
def when_i_click_the_dropdown_bars(context):
    control_click(context.driver, 'dropdown-basic')
    control_click(context.driver, 'Add expense')

@when(parsers.parse('I enter description \"{desc}\"'))
def when_i_enter_description(context, desc):
    control_text(context.driver, 'additem_desc', desc)

@when(parsers.parse('I enter quanity \"{quanity}\"'))
def when_i_enter_quanity(context, quanity):
    control_text(context.driver, 'additem_qty', quanity)

@when(parsers.parse('I enter rate \"{rate}\"'))
def when_i_enter_rate(context, rate):
    control_text(context.driver, 'additem_rate', rate)

@when("I click Add")
def when_i_click_add(context):
    control_click(context.driver, 'Add', index=2)
    
@when("I toggle the top checkbox")
def when_i_toggle_the_top_checkbox(context):
    xpath = '/html/body/div/div/div/div[2]/div/div/table/tbody/tr[1]/td[1]/div/input'
    element_click(element_from_xpath(context.driver, xpath))

@when("I click remove")
def when_i_click_remove(context):
    control_click(context.driver, 'dropdown-basic')
    control_click(context.driver, 'Remove selected')