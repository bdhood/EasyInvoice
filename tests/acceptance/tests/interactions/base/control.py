'''
uses element.py to create functions for each UI component on the site
'''

from .element import element_click, element_search, element_type, element_get_active

def control_click(driver, label, index=0):
    element_click(element_search(driver, label, index=index))

def control_text(driver, label, value):
    control_click(driver, label)
    element_type(element_get_active(driver), value.replace(r'{enter}', '\n' ))
