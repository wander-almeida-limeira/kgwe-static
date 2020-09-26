let graph3dinterface = {};

//init default values
var classColorCode = "#448afe";

//init settings color tab
graph3dinterface.setGraphView = function(jsonClasses) {
    var result = JSON.parse(JSON.stringify(jsonClasses));
    var jsonArray;
    if (result["@graph"] != undefined) {
        jsonArray = result;
    } else {
        var array = [];
        array.push(result);
        jsonArray = array;
    }
    var notesKey = Object.keys(jsonArray)
    console.log(notesKey);
    nodes_data_3d = [];
    //criando o array de nós
    for (var i = 0; i < notesKey.length; i++) {
        let node = notesKey[i];
        var notes = jsonArray[notesKey[i]];
        for (var j = 0; j < notes.length; j++) {
            let node = notes[j];
            var nodeObj = new Object();
            if (node["@id"].split("#").length > 1) {
                nodeObj.id = node["@id"].split("#")[1].toString();
            } else {
                nodeObj.id = node["@id"].split("/")[node["@id"].split("/").length - 1].toString();
            }
            nodes_data_3d[j] = nodeObj;
        }
    }

    links_data_3d = [];

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
                //linkObj.linkName = "subClassOf";
                links_data_3d[count] = linkObj;
                count++;
            }
        }
    }

    var count = 1;
    for(var i = 0; i < nodes_data_3d.length; i++) {
        for(var j = 0; j < links_data_3d.length; j++) {
            if(links_data_3d[j].target == nodes_data_3d[i].id) {
                for(var k = 0; k < nodes_data_3d.length; k++) {
                    if(nodes_data_3d[k].id == links_data_3d[j].source) {
                        nodes_data_3d[k].group = count;
                    }
                }
            }
        }
        count++;
    }

    var json = {
      "nodes": nodes_data_3d,
      "links": links_data_3d
    };

    var Graph = ForceGraph3D()
          (document.getElementById('3d-graph'))
            .backgroundColor('#1e1e1e')
            .height(window.innerHeight - 70)
            .graphData(json)
            .linkColor(link => link.color ? 'green' : 'white' )
            .linkOpacity(1)
            .nodeAutoColorBy('group')
            .nodeThreeObject(node => {
                      // use a sphere as a drag handle
                      const obj = new THREE.Mesh(
                        new THREE.SphereGeometry(10),
                        new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
                      );
                      // add text sprite as child
                      const sprite = new SpriteText(node.id);
                      sprite.color = node.color;
                      sprite.textHeight = 8;
                      obj.add(sprite);
                      return obj;
                    });

    Graph.d3Force('charge').strength(-350);

     return jsonArray;
}
