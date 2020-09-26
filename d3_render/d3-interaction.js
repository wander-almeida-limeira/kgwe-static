let d3interface = {};

//init default values
var classColorCode = "#448afe";
var classBorderColorCode = "#adadad";
var classLabelColorCode = "white";
var relationColourCode = "#6c9d60";
var radius = 40;
var circleBorder = 2;
var rectBorder = 2;
var linkStroke = 2;
var rectHeight = 40;
var rectWidth = 40;
var imgHeight = 100;
var imgWidth = 100;
var nodeType = "circle";
var classImageURL = "";
var imagePaddingY = 0;
var imagePaddingX = 0;
var linkArrowPaddingY = 0;
var linkArrowPaddingX = 0;
var tickActionsReset = false;
//end default values

var colorRuleArray = [];
var imageRuleArray = [];
var radiusRuleArray = [];
var sizeRuleArray = [];
var strokeRuleArray = [];
var replaceLinkTextRuleArray = [];
var nodes_data = [];
var links_data = [];
var original_links_data = [];
var jsonArrayRefresh;
var drag_start_x;
var drag_start_y;
var instancesCountArray = [];

//init settings color tab
d3interface.setClassColorCode = function(colorCode) {
    classColorCode = colorCode;
}

d3interface.setClassLabelColorCode = function(colorCode) {
    classLabelColorCode = colorCode;
}

d3interface.setRelationColorCode = function(colorCode) {
    relationColourCode = colorCode;
}

d3interface.setClassBorderColorCode = function(colorCode) {
    classBorderColorCode = colorCode;
}

d3interface.setColorRuleArray = function(colorRules) {
    console.log(colorRules.toArray());
    colorRuleArray = colorRules.toArray()
}
//end settings color tab

//init settings size tab
d3interface.setCircleRadius = function(radiusParam) {
    radius = radiusParam;
}

d3interface.setCircleBorder = function(borderParam) {
    circleBorder = borderParam;
}

d3interface.setRectHeight = function(rectHeightParam) {
    rectHeight = rectHeightParam;
}

d3interface.setRectWidth = function(rectWidthParam) {
    rectWidth = rectWidthParam;
}

d3interface.setRectBorder = function(borderParam) {
    rectBorder = borderParam;
}

d3interface.setImgHeight = function(imgHeightParam) {
    imgHeight = imgHeightParam;
}

d3interface.setImgWidth = function(imgWidthParam) {
    imgWidth = imgWidthParam;
}

d3interface.setLinkStroke = function(strokeParam) {
    linkStroke = strokeParam;
}

//rules
d3interface.setRadiusRule = function(radiusRuleArrayParam) {
    radiusRuleArray = radiusRuleArrayParam.toArray()
}
d3interface.setSizeRule = function(sizeRuleArrayParam) {
    sizeRuleArray = sizeRuleArrayParam.toArray()
}
d3interface.setStrokeRule = function(strokeRuleArrayParam) {
    strokeRuleArray = strokeRuleArrayParam.toArray()
}
//end settings size tab

//init replace link text rules
d3interface.setReplaceLinkTextRule = function(replaceLinkTextRuleArrayParam) {
    replaceLinkTextRuleArray = replaceLinkTextRuleArrayParam.toArray()
}
//end replace link text rules

//init settings shape/image tab
d3interface.setClassElementRepresentation = function(nodeTypeParam) {
    if (nodeTypeParam == "1") {
        nodeType = "circle";
    } else if (nodeTypeParam == "2") {
        nodeType = "rect";
    } else if (nodeTypeParam == "3") {
        nodeType = "custom";
    }
}
d3interface.setClassImageURL = function(classImageURLParam) {
    classImageURL = classImageURLParam;
}
d3interface.setCustomClassImageRule = function(imageRuleArrayParam) {
    imageRuleArray = imageRuleArrayParam.toArray()
}
//end settings shape/image tab

//init settings others settigs tab
d3interface.setImagePaddingY = function(imagePaddingYParam) {
    imagePaddingY = imagePaddingYParam;
}
d3interface.setImagePaddingX = function(imagePaddingXParam) {
    imagePaddingX = imagePaddingXParam;
}
d3interface.setLinkArrowPaddingY = function(linkArrowPaddingYParam) {
    linkArrowPaddingY = linkArrowPaddingYParam;
}
d3interface.setLinkArrowPaddingX = function(linkArrowPaddingXParam) {
    linkArrowPaddingX = linkArrowPaddingXParam;
}
//end settings others settigs tab

//***************************************************************************************************************************************************

d3interface.refreshGraph = function() {
    d3.selectAll("#d3svg > *").remove();
    renderAfterLoading(jsonArrayRefresh);
}

d3interface.neighborViewRefresh = function(nodeURI, level, json, nodeToParent, childToNode) {
    d3.selectAll("#d3svg > *").remove();
    var jsonIterate = JSON.parse(JSON.stringify(json));

    nodes_data = [];
    for (var i = 0; i < jsonIterate.length; i++) {
        if (jsonIterate[i]["@id"] == nodeURI) {
            if (nodeToParent) {
                nodes_data[nodes_data.length] = jsonIterate[i];
                if (jsonIterate[i]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] != undefined) {
                    getParentNodes(jsonIterate[i]["http://www.w3.org/2000/01/rdf-schema#subClassOf"], nodes_data, parseInt(level), 1, jsonIterate);
                }
            } else {
                jsonIterate[i]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] = undefined;
                nodes_data[nodes_data.length] = jsonIterate[i];
            }
            if (childToNode) {
                getChildNodes(nodeURI, nodes_data, parseInt(level), 1, jsonIterate);
            }
        }
    }
    for (var i = 0; i < jsonIterate.length; i++) {
        var exists = false;
        for (var j = 0; j < nodes_data.length; j++) {
            if (jsonIterate[i]["@id"] == nodes_data[j]["@id"]) {
                exists = true;
            }
        }
        if (!exists) {
            jsonIterate.splice(i, 1);
        }
    }

    var array = [];
    array.push(nodes_data);
    renderAfterLoading(new Array(nodes_data));
}

function getParentNodes(parentArray, nodes_data, level, indexLevel, jsonIterate) {
    for (var i = 0; i < parentArray.length; i++) {
        for (var j = 0; j < jsonIterate.length; j++) {
            if (jsonIterate[j]["@id"] == parentArray[i]["@id"]) {
                nodes_data[nodes_data.length] = jsonIterate[j];
                if (jsonIterate[j]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] != undefined && indexLevel < level) {
                    getParentNodes(jsonIterate[j]["http://www.w3.org/2000/01/rdf-schema#subClassOf"], nodes_data, level, indexLevel + 1, jsonIterate);
                } else if (jsonIterate[j]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] != undefined) {
                    jsonIterate[j]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] = undefined;
                }
            }
        }
    }
}

function getChildNodes(nodeURI, nodes_data, level, indexLevel, jsonIterate) {
    for (var i = 0; i < jsonIterate.length; i++) {
        if (jsonIterate[i]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] != undefined) {
        var subClassOfLength = jsonIterate[i]["http://www.w3.org/2000/01/rdf-schema#subClassOf"].length;
            for (var j = 0; j < subClassOfLength; j++) {
                if (nodeURI == jsonIterate[i]["http://www.w3.org/2000/01/rdf-schema#subClassOf"][j]["@id"]) {
                    nodes_data[nodes_data.length] = jsonIterate[i];
                    if (jsonIterate[i]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] != undefined && indexLevel < level) {
                        getChildNodes(jsonIterate[i]["@id"], nodes_data, level, indexLevel + 1, jsonIterate);
                    } else if (jsonIterate[j]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] != undefined) {
                        jsonIterate[j]["http://www.w3.org/2000/01/rdf-schema#subClassOf"] = undefined;
                    }
                }
            }
        }
    }
}

d3interface.instancesCount = function(json) {
    instancesCountArray = JSON.parse(JSON.stringify(json));
}

d3interface.render = function(json) {
    //d3.select("#d3svg").remove();
    d3.selectAll("#d3svg > *").remove();

    var result = JSON.parse(JSON.stringify(json));
    if (result["@graph"] != undefined) {
        jsonArrayRefresh = result;
        renderAfterLoading(result);
    } else {
        var array = [];
        array.push(result);
        jsonArrayRefresh = array;
        renderAfterLoading(array);
    }
}

function copyObject(aObject) {
    if (!aObject) {
        return aObject;
    }

    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? copyObject(v) : v;
    }

    return bObject;
}

function renderAfterLoading(jsonArray) {
    if (document.getElementById("d3svg") != undefined) {
        var svg = d3.select("#d3svg"),
            width = document.getElementById("d3svg").clientWidth + 20000,
            height = document.getElementById("d3svg").clientHeight + 20000;
        //let jsonArray = jsonLdInterface.getJson();

        function convertJsonLD() {

            //jsonld.expand(jsonArray, function(err, expanded) {
            //    console.log(expanded);
            //});

            // flatten a document
            // see: http://json-ld.org/spec/latest/json-ld/#flattened-document-form
            //jsonld.flatten(jsonArray, (err, flattened) => {
            //   console.log(flattened);
            //});

            // canonize (normalize) a document using the RDF Dataset Normalization Algorithm
            // (URDNA2015), see: http://json-ld.github.io/normalization/spec/
            //jsonld.canonize(jsonArray, {
            //  algorithm: 'URDNA2015',
            //  format: 'application/n-quads'
            //}, (err, canonized) => {
            // console.log(canonized);
            //});

            // serialize a document to N-Quads (RDF)
            //jsonld.toRDF(jsonArray, {format: 'application/n-quads'}, (err, nquads) => {
            // console.log(nquads);
            //});

            var notesKey = Object.keys(jsonArray)

            nodes_data = [];
            //criando o array de nós
            for (var i = 0; i < notesKey.length; i++) {
                let node = notesKey[i];
                var notes = jsonArray[notesKey[i]];
                for (var j = 0; j < notes.length; j++) {
                    let node = notes[j];
                    var nodeObj = new Object();
                    if (node["@id"].split("#").length > 1) {
                        nodeObj.nodeName = node["@id"].split("#")[1].toString();
                        nodeObj.nodeId = node["@id"].toString();
                    } else {
                        nodeObj.nodeName = node["@id"].split("/")[node["@id"].split("/").length - 1].toString();
                        nodeObj.nodeId = node["@id"].toString();
                    }
                    nodes_data[j] = nodeObj;
                }
            }

            links_data = [];
            //criando o array de links
            for (var i = 0; i < notesKey.length; i++) {
                let node = notesKey[i];
                var notes = jsonArray[notesKey[i]];
                var count = 0;
                for (var j = 0; j < notes.length; j++) {
                    let node = notes[j];
                    if (node["http://www.w3.org/2000/01/rdf-schema#subClassOf"] != undefined) {
                        var linkObj = new Object();
                        if (node["@id"].split("#").length > 1) {
                            linkObj.source = node["@id"].split("#")[1].toString();
                        } else {
                            linkObj.source = node["@id"].split("/")[node["@id"].split("/").length - 1].toString();
                        }
                        if (node["http://www.w3.org/2000/01/rdf-schema#subClassOf"][0]["@id"].split("#").length > 1) {
                            linkObj.target = node["http://www.w3.org/2000/01/rdf-schema#subClassOf"][0]["@id"].split("#")[1].toString();
                        } else {
                            linkObj.target = node["http://www.w3.org/2000/01/rdf-schema#subClassOf"][0]["@id"].split("/")[node["http://www.w3.org/2000/01/rdf-schema#subClassOf"][0]["@id"].split("/").length - 1].toString();
                        }
                        linkObj.linkName = "subClassOf";
                        links_data[count] = linkObj;
                        count++;
                    }
                }
            }
        }
        convertJsonLD();
        //console.log(nodes_data);
        //console.log(links_data);
        original_links_data = copyObject(links_data);

        //set up the simulation
        var simulation = d3.forceSimulation()
            //add nodes
            .nodes(nodes_data);

        var link_force = d3.forceLink(links_data)
            .id(function(d) {
                return d.nodeName;
            })
            .distance(function(d) {
                return 200;
            })
            .strength(1);

        var charge_force = d3.forceManyBody()
            .strength(-100);

        var center_force = d3.forceCenter(width / 14.5, height / 14.5);

        var collide_force = d3.forceCollide(1.2 * 10);

        //custom force to put stuff in a box
        function box_force(alpha) {
            for (var i = 0, n = nodes_data.length; i < n; ++i) {
                var curr_node = nodes_data[i];
                curr_node.x = Math.max(radius, Math.min(width - radius, curr_node.x));
                curr_node.y = Math.max(radius, Math.min(height - radius, curr_node.y));
            }
        }

        svg.on("contextmenu", svgRightClick);

        simulation
            .force("charge_force", charge_force)
            .force("center_force", center_force)
            .force("links", link_force)
            .force("box_force", box_force)
            .force("collide", collide_force)
            .alphaDecay(0.01)
            .velocityDecay(0.4);


        //add tick instructions:
        simulation.on("tick", tickActions);

        //draw lines for the links
        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links_data)
            .enter().append("line")
            .attr("stroke-width", getCustomStrokeRule)
            .attr("marker-end", "url(#end)")
            .style("stroke", relationColourCode);

        var linkText = svg.append("g")
            .attr("class", "link-label")
            .selectAll("links")
            .data(links_data)
            .enter()
            .append("text")
            .attr("class", "link-label")
            .attr("font-family", "Arial, Helvetica, sans-serif")
            .attr("fill", "Black")
            .style("font", "normal 12px Arial")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) {
                return getCustomLinkText(d);
            });

        //draw circles for the nodes
        var node;
        if (nodeType == "circle") {

            node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("node")
                .data(nodes_data)
                .enter()
                .append("circle")
                .attr("id", function(d) {
                    return d.nodeId;
                })
                .attr("name", function(d) {
                    return d.nodeName;
                })
                .attr("r", getCustomRadiusRule)
                .attr("stroke", getClassBorderColorCode)
                .attr("stroke-width", getCircleBorderRule)
                .attr("fill", getClassColorCode)
                .on("click", click)
                .on("contextmenu", rightClick);

        } else if (nodeType == "rect") {

            node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("rect")
                .data(nodes_data)
                .enter().append("rect")
                .attr("id", function(d) {
                    return d.nodeId;
                })
                .attr("name", function(d) {
                    return d.nodeName;
                })
                .attr("width", getRectWidthRule)
                .attr("height", getRectHeightRule)
                .attr("stroke", getClassBorderColorCode)
                .attr("stroke-width", getRectBorderRule)
                .attr("fill", getClassColorCode)
                .on("click", click)
                .on("contextmenu", rightClick);

        } else {

            node = svg.append("g")
                .attr("class", "nodes")
                .selectAll(".node")
                .data(nodes_data)
                .enter().append("image")
                .attr("id", function(d) {
                    return d.nodeId;
                })
                .attr("name", function(d) {
                    return d.nodeName;
                })
                .attr("xlink:href", getCustomClassImageRule)
                .attr("width", getImageWidthRule)
                .attr("height", getImageHeightRule)
                .on("click", click)
                .on("contextmenu", rightClick);

        }

        var text = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes_data)
            .enter().append("text")
            .attr("dy", 2)
            .attr("text-anchor", "middle")
            .text(function(d) {
                return d.nodeName
            })
            .attr("fill", classLabelColorCode);

        svg.append("svg:defs").selectAll("marker")
            .data(["end"]) // Different link/path types can be defined here
            .enter().append("svg:marker") // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 61)
            .attr("refY", 0.5)
            .attr("markerWidth", 4)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", relationColourCode)
            .style("stroke", relationColourCode);

        var drag_handler = d3.drag()
            .on("start", drag_start)
            .on("drag", drag_drag)
            .on("end", drag_end);

        drag_handler(node)

        //drag handler
        //d is the node
        function drag_start(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            drag_start_x = d.x;
            drag_start_y = d.y;
        }

        function drag_drag(d) {
            var current_scale;
            var current_scale_string;
            if (this.getAttribute("transform") === null) {
                current_scale = 1;
            } else {
                current_scale_string = this.getAttribute("transform").split(' ')[1];
                current_scale = +current_scale_string.substring(6, current_scale_string.length - 1);
            }
            d.fx = drag_start_x + ((d3.event.x - drag_start_x) / current_scale);
            d.fy = drag_start_y + ((d3.event.y - drag_start_y) / current_scale);
            //make sure you can't drag the circle outside the box
            //Math.max(radius, Math.min(width - radius, d3.event.x));
            //Math.max(radius, Math.min(height - radius, d3.event.y));
        }

        function drag_end(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            //d.fx = null;
            //d.fy = null;
        }

        function tickActions() {
            if (simulation.alpha() == 0.99) {
                tickActionsReset = true;
            }
            if (simulation.alpha() < 0.99 && tickActionsReset) {
                document.getElementsByClassName('loading')[0].style.display = 'none';
                tickActionsReset = false;
            }
            if (simulation.alpha() < 0.01) {
                simulation.stop();
            }
            //update circle positions each tick of the simulation
            if (nodeType == "circle") {
                node
                    .attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    });
            } else if (nodeType == "rect") {
                node
                    .attr("x", function(d) {
                        return d.x;
                    })
                    .attr("y", function(d) {
                        return d.y;
                    });
            } else {
                node
                    .attr("x", function(d) {
                        return d.x - (parseInt(imagePaddingX));
                    })
                    .attr("y", function(d) {
                        return d.y - (parseInt(imagePaddingY))
                    });;
            }

            //update link positions
            link
                .attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });

            linkText
                .attr("x", function(d) {
                    return ((d.source.x + d.target.x) / 2);
                })
                .attr("y", function(d) {
                    return ((d.source.y + d.target.y) / 2);
                });

            text
                .attr("x", function(d) {
                    return d.x;
                })
                .attr("y", function(d) {
                    return d.y;
                });
        }


        //zoom init

        //create zoom handler
        //zoom actions is a function that performs the zooming.
        var zoom_handler = d3.zoom()
            .on("zoom", zoom_actions);

        //specify what to do when zoom event listener is triggered
        function zoom_actions() {

            node.attr("transform", d3.event.transform);
            link.attr("transform", d3.event.transform);
            linkText.attr("transform", d3.event.transform);
            text.attr("transform", d3.event.transform);
        }

        //add zoom behaviour to the svg element
        //same as svg.call(zoom_handler);
        zoom_handler(svg);

        d3.select("#zoom_in").on("click", function() {
            zoom_handler.scaleBy(svg.transition().duration(750), 1.2);
        });
        d3.select("#zoom_out").on("click", function() {
            zoom_handler.scaleBy(svg.transition().duration(750), 0.8);
        });

        //zoom end

        function click(d, i) {
            window.functions.get("rightPanelGraphJavascriptInterface")({
                "event": "selectedClassEvent",
                "nodeId": d.nodeId
            })
        }

        function rightClick(d, i) {
            d3.event.preventDefault();
            window.functions.get("rightPanelGraphJavascriptInterface")({
                "event": "rightClickClassEvent",
                "nodeId": d.nodeId,
                "nodeName": d.nodeName,
                "d3event": d3.event
            });
            d3.event.stopPropagation();
        }

        function svgRightClick() {
            d3.event.preventDefault();
            window.functions.get("rightPanelGraphJavascriptInterface")({
                "event": "rightClickSvgEvent",
                "anchorPositionX": d3.event.screenX,
                "anchorPositionY": d3.event.screenY -60
            });
        }
    }
}