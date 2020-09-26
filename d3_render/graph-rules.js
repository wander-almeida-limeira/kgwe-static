function getClassColorCode(d) {
    if (colorRuleArray.length > 0) {

        //rule 1, Element Background Color

        //type = class
        for (var i = 0; i < colorRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == colorRuleArray[i].elementValue.toUpperCase() && colorRuleArray[i].rule == 1 && colorRuleArray[i].elementType == 1) {
                return colorRuleArray[i].colorCode;
            }
        }

        //type = subclass
        //não aplicado se existir uma cor definida para a classe (ordem de precedência)
        for (var i = 0; i < colorRuleArray.length; i++) {
            if (colorRuleArray[i].rule == 1 && colorRuleArray[i].elementType == 2) {
                if (getChildrens(colorRuleArray[i].elementValue, d.nodeName)) {
                    return colorRuleArray[i].colorCode;
                }
            }
        }

        //type = number of individuals
        for (var i = 0; i < colorRuleArray.length; i++) {
            if (colorRuleArray[i].rule == 1 && colorRuleArray[i].elementType == 3) {
                if (verifyNodeInstancesCount(colorRuleArray[i].elementValue, d.nodeId)) {
                    return colorRuleArray[i].colorCode;
                }
            }
        }

        return classColorCode;
    } else {
        return classColorCode;
    }
}

function getClassBorderColorCode(d) {
    if (colorRuleArray.length > 0) {

        //rule 2, Element Background Color

        //type = class
        for (var i = 0; i < colorRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == colorRuleArray[i].elementValue.toUpperCase() && colorRuleArray[i].rule == 2 && colorRuleArray[i].elementType == 1) {
                return colorRuleArray[i].colorCode;
            }
        }

        //type = subclass
        //não aplicado se existir uma cor definida para a classe (ordem de precedência)
        for (var i = 0; i < colorRuleArray.length; i++) {
            if (colorRuleArray[i].rule == 2 && colorRuleArray[i].elementType == 2) {
                if (getChildrens(colorRuleArray[i].elementValue, d.nodeName)) {
                    return colorRuleArray[i].colorCode;
                }
            }
        }

        return classBorderColorCode;
    } else {
        return classBorderColorCode;
    }
}

function getCustomClassImageRule(d) {
    if (imageRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < imageRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == imageRuleArray[i].elementValue.toUpperCase() && imageRuleArray[i].rule == 1 && imageRuleArray[i].elementType == 1) {
                return imageRuleArray[i].imageURL;
            }
        }

        //type = subclass
        for (var i = 0; i < imageRuleArray.length; i++) {
            if (imageRuleArray[i].rule == 1 && imageRuleArray[i].elementType == 2) {
                if (getChildrens(imageRuleArray[i].elementValue, d.nodeName)) {
                    return imageRuleArray[i].imageURL;
                }
            }
        }

        return classImageURL;
    } else {
        return classImageURL;
    }
}

//size rules init
function getCustomRadiusRule(d) {
    //CIRCLE_RADIUS_RULE = 1
    if (radiusRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < radiusRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == radiusRuleArray[i].elementValue.toUpperCase() && radiusRuleArray[i].rule == 1 && radiusRuleArray[i].elementType == 1) {
                return radiusRuleArray[i].radius;
            }
        }

        //type = subclass
        for (var i = 0; i < radiusRuleArray.length; i++) {
            if (radiusRuleArray[i].rule == 1 && radiusRuleArray[i].elementType == 2) {
                if (getChildrens(radiusRuleArray[i].elementValue, d.nodeName)) {
                    return radiusRuleArray[i].radius;
                }
            }
        }

        //type = number of individuals
        for (var i = 0; i < radiusRuleArray.length; i++) {
            if (radiusRuleArray[i].rule == 1 && radiusRuleArray[i].elementType == 3) {
                if (verifyNodeInstancesCount(radiusRuleArray[i].elementValue, d.nodeId)) {
                    return radiusRuleArray[i].radius;
                }
            }
        }

        return radius;
    } else {
        return radius;
    }
}

function getCircleBorderRule(d) {
    //CIRCLE_BORDER_WIDTH_RULE = 2
    if (strokeRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < strokeRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == strokeRuleArray[i].elementValue.toUpperCase() && strokeRuleArray[i].rule == 2 && strokeRuleArray[i].elementType == 1) {
                return strokeRuleArray[i].strokeWidth;
            }
        }

        //type = subclass
        for (var i = 0; i < strokeRuleArray.length; i++) {
            if (strokeRuleArray[i].rule == 2 && strokeRuleArray[i].elementType == 2) {
                if (getChildrens(strokeRuleArray[i].elementValue, d.nodeName)) {
                    return strokeRuleArray[i].strokeWidth;
                }
            }
        }

        return circleBorder;
    } else {
        return circleBorder;
    }
}

function getRectHeightRule(d) {
    //RECT_SIZE_RULE = 3
    if (sizeRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == sizeRuleArray[i].elementValue.toUpperCase() && sizeRuleArray[i].rule == 3 && sizeRuleArray[i].elementType == 1) {
                return sizeRuleArray[i].elementHeight;
            }
        }

        //type = subclass
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (sizeRuleArray[i].rule == 3 && sizeRuleArray[i].elementType == 2) {
                if (getChildrens(sizeRuleArray[i].elementValue, d.nodeName)) {
                    return sizeRuleArray[i].elementHeight;
                }
            }
        }

        return rectHeight;
    } else {
        return rectHeight;
    }
}

function getRectWidthRule(d) {
    //RECT_SIZE_RULE = 3
    if (sizeRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == sizeRuleArray[i].elementValue.toUpperCase() && sizeRuleArray[i].rule == 3 && sizeRuleArray[i].elementType == 1) {
                return sizeRuleArray[i].elementWidth;
            }
        }

        //type = subclass
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (sizeRuleArray[i].rule == 3 && sizeRuleArray[i].elementType == 2) {
                if (getChildrens(sizeRuleArray[i].elementValue, d.nodeName)) {
                    return sizeRuleArray[i].elementWidth;
                }
            }
        }

        return rectWidth;
    } else {
        return rectWidth;
    }
}

function getRectBorderRule(d) {
    //RECT_BORDER_WIDTH_RULE = 4
    if (strokeRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < strokeRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == strokeRuleArray[i].elementValue.toUpperCase() && strokeRuleArray[i].rule == 4 && strokeRuleArray[i].elementType == 1) {
                return strokeRuleArray[i].strokeWidth;
            }
        }

        //type = subclass
        for (var i = 0; i < strokeRuleArray.length; i++) {
            if (strokeRuleArray[i].rule == 4 && strokeRuleArray[i].elementType == 2) {
                if (getChildrens(strokeRuleArray[i].elementValue, d.nodeName)) {
                    return strokeRuleArray[i].strokeWidth;
                }
            }
        }

        return rectBorder;
    } else {
        return rectBorder;
    }
}

function getImageHeightRule(d) {
    //IMG_SIZE_RULE = 5
    if (sizeRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == sizeRuleArray[i].elementValue.toUpperCase() && sizeRuleArray[i].rule == 5 && sizeRuleArray[i].elementType == 1) {
                return sizeRuleArray[i].elementHeight;
            }
        }

        //type = subclass
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (sizeRuleArray[i].rule == 5 && sizeRuleArray[i].elementType == 2) {
                if (getChildrens(sizeRuleArray[i].elementValue, d.nodeName)) {
                    return sizeRuleArray[i].elementHeight;
                }
            }
        }

        //type = number of individuals
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (sizeRuleArray[i].rule == 5 && sizeRuleArray[i].elementType == 3) {
                if (verifyNodeInstancesCount(sizeRuleArray[i].elementValue, d.nodeId)) {
                    return sizeRuleArray[i].elementHeight;
                }
            }
        }

        return imgHeight;
    } else {
        return imgHeight;
    }
}

function getImageWidthRule(d) {
    //IMG_SIZE_RULE = 5
    if (sizeRuleArray.length > 0) {

        //type = class
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (d.nodeName.toUpperCase() == sizeRuleArray[i].elementValue.toUpperCase() && sizeRuleArray[i].rule == 5 && sizeRuleArray[i].elementType == 1) {
                return sizeRuleArray[i].elementWidth;
            }
        }

        //type = subclass
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (sizeRuleArray[i].rule == 5 && sizeRuleArray[i].elementType == 2) {
                if (getChildrens(sizeRuleArray[i].elementValue, d.nodeName)) {
                    return sizeRuleArray[i].elementWidth;
                }
            }
        }

        //type = number of individuals
        for (var i = 0; i < sizeRuleArray.length; i++) {
            if (sizeRuleArray[i].rule == 5 && sizeRuleArray[i].elementType == 3) {
                if (verifyNodeInstancesCount(sizeRuleArray[i].elementValue, d.nodeId)) {
                    return sizeRuleArray[i].elementWidth;
                }
            }
        }

        return imgWidth;
    } else {
        return imgWidth;
    }
}

function getCustomStrokeRule(d) {
    //LINK_STROKE_RULE = 6
    if (strokeRuleArray.length > 0) {

        //type = source
        for (var i = 0; i < strokeRuleArray.length; i++) {
            if (d.source.nodeName.toUpperCase() == strokeRuleArray[i].elementValue.toUpperCase() && strokeRuleArray[i].rule == 6 && strokeRuleArray[i].elementType == 1) {
                return strokeRuleArray[i].strokeWidth;
            }
        }

        //type = target
        for (var i = 0; i < strokeRuleArray.length; i++) {
            if (d.target.nodeName.toUpperCase() == strokeRuleArray[i].elementValue.toUpperCase() && strokeRuleArray[i].rule == 6 && strokeRuleArray[i].elementType == 2) {
                return strokeRuleArray[i].strokeWidth;
            }
        }

        return linkStroke;
    } else {
        return linkStroke;
    }
}
//end size rules

//init replace link text rules
function getCustomLinkText(d) {
    if (replaceLinkTextRuleArray.length > 0) {

        //type = source
        for (var i = 0; i < replaceLinkTextRuleArray.length; i++) {
            if (d.source.nodeName.toUpperCase() == replaceLinkTextRuleArray[i].elementValue.toUpperCase() && replaceLinkTextRuleArray[i].elementType == 1) {
                return replaceLinkTextRuleArray[i].textValue;
            }
        }

        //type = target
        for (var i = 0; i < replaceLinkTextRuleArray.length; i++) {
            if (d.target.nodeName.toUpperCase() == replaceLinkTextRuleArray[i].elementValue.toUpperCase() && replaceLinkTextRuleArray[i].elementType == 2) {
                return replaceLinkTextRuleArray[i].textValue;
            }
        }

        //type = link
        for (var i = 0; i < replaceLinkTextRuleArray.length; i++) {
            if (d.linkName.toUpperCase() == replaceLinkTextRuleArray[i].elementValue.toUpperCase() && replaceLinkTextRuleArray[i].elementType == 3) {
                return replaceLinkTextRuleArray[i].textValue;
            }
        }

        return d.linkName;
    } else {
        return d.linkName;
    }
    return d.linkName;
}
//end replace link text rules

function getChildrens(parentName, nodeName) {
    for (var i = 0; i < original_links_data.length; i++) {
        if (original_links_data[i].target != undefined && original_links_data[i].target == parentName) {
            if (original_links_data[i].source != undefined && original_links_data[i].source == nodeName) {
                return true;
            }
        }
    }
    return false;
}

function verifyNodeInstancesCount(value, nodeId) {
    for (var i = 0; i < instancesCountArray.length; i++) {
        if (nodeId == instancesCountArray[i]["@id"]) {
            var labelArray = instancesCountArray[i]["http://www.w3.org/2000/01/rdf-schema#label"];
            for (var j = 0; j < labelArray.length; j++) {
                if (labelArray[j]["@type"] != undefined && labelArray[j]["@type"] == "http://www.w3.org/2001/XMLSchema#integer") {
                    var greaterThanEqual = value.split("X")[0];
                    var lessThanEqual = value.split("X")[1];
                    if (labelArray[j]["@value"] >= greaterThanEqual && labelArray[j]["@value"] <= lessThanEqual) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}