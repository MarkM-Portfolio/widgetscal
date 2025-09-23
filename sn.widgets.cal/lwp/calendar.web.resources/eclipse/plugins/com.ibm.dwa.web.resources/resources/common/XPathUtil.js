/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("dwa.common.XPathUtil");


/*=====
	dwa.common.XPathUtil = {
		// summary:
		//		Functions to obtain XML nodes and their contents via XPath, supporting multiple browsers.

		selectSingleNode: function(node, expression, resolver){
			// summary:
			//		Returns a single node given XPath.
			// node: Object
			//		The XML node to search from.
			// expression: String
			//		The XPath expression.
			// resolver: Function?
			//		The function to resolve namespaces.
			// returns:
			//		The XML node found.

			return foundNode; // Object
		},

		selectNodes: function(node, expression, resolver){
			// summary:
			//		Returns a list of nodes given XPath.
			// node: Object
			//		The XML node to search from.
			// expression: String
			//		The XPath expression.
			// resolver: Function?
			//		The function to resolve namespaces.
			// returns:
			//		The list of XML nodes found.

			return foundNodes; // Object
		},

		snapshotLength: function(node){
			// summary:
			//		Given a node set, returns how many items are in the node set.
			// node: Object
			//		The node set.
			// returns:
			//		The number of items in the node set.

			return theLength; // Number
		},

		snapshotItem: function(node, i){
			// summary:
			//		Returns a DOM node of the given node set and offset.
			// node: Object
			//		The node set.
			// i: Number
			//		The offset.
			// returns:
			//		The DOM node.

			return theItem; // Object
		},

		nodeText: function(node){
			// summary:
			//		Returns the text in the given DOM node.
			// returns:
			//		The text.

			return theText; // String
		}
	};
=====*/

	if(!window.XPathEvaluator){
		dojo.setObject( "dwa.common.XPathUtil", {
			selectSingleNode: function(node, expression){
				return node.selectSingleNode(expression);
			},
			selectNodes: function(node, expression){
				return node.selectNodes(expression);
			},
			snapshotLength: function(node){
				return node.length;
			},
			snapshotItem: function(node, i){
				return node[i];
			},
			nodeText: function(node){
				return node.text;
			}
		});
	}else{
		var XPathEvaluatorCache = dwa.XPathEvaluatorCache;
		if(!XPathEvaluatorCache){
			dwa.XPathEvaluatorCache = XPathEvaluatorCache = new XPathEvaluator;
		}

		dojo.setObject( "dwa.common.XPathUtil", {
			selectSingleNode: function(node, expression, resolver){
				return XPathEvaluatorCache.evaluate(expression, node, resolver || XPathEvaluatorCache.createNSResolver(node), XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			},
			selectNodes: function(node, expression, resolver){
				return XPathEvaluatorCache.evaluate(expression, node, resolver || XPathEvaluatorCache.createNSResolver(node), XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			},
			snapshotLength: function(node){
				return node.snapshotLength;
			},
			snapshotItem: function(node, i){
				return node.snapshotItem(i);
			},
			nodeText: function(node){
				return node.textContent;
			}
		});
	}
