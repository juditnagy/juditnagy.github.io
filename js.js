console.log("ok")



function menuDisappear() {
    var x = document.getElementById("navbarToggleExternalContent");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }


  }

  
console.log("ok2")

window.onload=function(){
document.getElementById("templateOne").addEventListener("mouseover", mouseOver);
document.getElementById("templateOne").addEventListener("mouseout", mouseOut);

function mouseOver() {
  document.getElementById("templateOne").style.width = "108%";
  document.getElementById("templateOne").style.height = "108%";
}

function mouseOut() {
  document.getElementById("templateOne").style.width = "100%";
  document.getElementById("templateOne").style.height = "100%";
}

document.getElementById("templateTwo").addEventListener("mouseover", mouseOverTwo);
document.getElementById("templateTwo").addEventListener("mouseout", mouseOutTwo);

function mouseOverTwo() {
  document.getElementById("templateTwo").style.width = "108%";
  document.getElementById("templateTwo").style.height = "108%";
}

function mouseOutTwo() {
  document.getElementById("templateTwo").style.width = "100%";
  document.getElementById("templateTwo").style.height = "100%";
}

}

console.log("ok3")

var WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth;
var WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight;

var ScrollMonitor = function (options) {
    this.items = [];
    this.options = {};

    for (var key in options) {
        this.options[key] = options[key];
    }
};

ScrollMonitor.prototype.add = function (node, options) {
    var gap = options.gap || 0;
    this.items.push({
        node: node,
        gap: +gap === gap ? [gap, gap, gap, gap] : gap,
        callbacks: {
            step: options.step || function (node, distance) {},
            enter: options.enter || function (node, distance) {},
            leave: options.leave || function (node, distance) {}
        }
    });
    
    this.resize();
};

ScrollMonitor.prototype.resize = function () {
    WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth;
    WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight;

    for (var i = 0; i < this.items.length; i++) {
        var node = this.items[i].node;
        this.items[i].rect = {
            top: node.offsetTop,
            left: node.offsetLeft,
            width: node.clientWidth,
            height: node.clientHeight
        };
    }
};

ScrollMonitor.prototype.scroll = function (scrollX, scrollY) {

    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var rect = item.rect;
        var gap = item.gap;

        var distance = {
            top: (rect.top + rect.height) - scrollY,
            left: (rect.left + rect.width) - scrollX,
            right: rect.left - (WINDOW_WIDTH + scrollX),
            bottom: rect.top - (WINDOW_HEIGHT + scrollY),
        };

        var inView = (distance.right < -gap[1] && distance.left > gap[3] && distance.bottom < -gap[2] && distance.top > gap[0]);

        if (inView && !item.callbacks.once) {
            item.callbacks.once = true;
            item.callbacks.enter.call(this, item.node, distance);
        }

        if (!inView && item.callbacks.once) {
            item.callbacks.once = false;
            item.callbacks.leave.call(this, item.node, distance);
        }
        
        item.callbacks.step.call(this, item.node, distance);
    }
};

var monitor = new ScrollMonitor();
var nodeList = document.querySelectorAll('.item');

for (var i = 0; i < nodeList.length; i++) {
    monitor.add(nodeList[i], {
        gap: 0,
        enter: function (node, distance) {
            node.classList.add('in-view');
        },
        leave: function (node, distance) {
            node.classList.remove('');
        }
    });
}

window.onscroll = function () { monitor.scroll(window.pageXOffset, window.pageYOffset); };
window.onresize = function () { monitor.resize(); window.onscroll(); };

window.onresize();