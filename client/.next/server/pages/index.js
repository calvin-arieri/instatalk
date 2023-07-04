"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_themes__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst Home = ()=>{\n    const { theme  } = (0,next_themes__WEBPACK_IMPORTED_MODULE_2__.useTheme)();\n    const { 0: hideButtons , 1: setHideButtons  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const scrollRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const parentRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const handleScroll = (direction)=>{\n        const { current  } = scrollRef;\n        const scrollAmount = window.innerWidth > 1800 ? 270 : 210;\n        if (direction === 'left') {\n            current.scrollLeft -= scrollAmount;\n        } else {\n            current.scrollLeft += scrollAmount;\n        }\n    };\n    // check if scrollRef container is overfilling its parentRef container\n    const isScrollable = ()=>{\n        const { current  } = scrollRef;\n        const { current: parent  } = parentRef;\n        if ((current === null || current === void 0 ? void 0 : current.scrollWidth) >= (parent === null || parent === void 0 ? void 0 : parent.offsetWidth)) return setHideButtons(false);\n        return setHideButtons(true);\n    };\n    // if window is resized\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        isScrollable();\n        window.addEventListener('resize', isScrollable);\n        return ()=>{\n            window.removeEventListener('resize', isScrollable);\n        };\n    });\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center sm:px-2 p-2\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full minmd:w-4/5\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0\",\n                        children: \"Fetch all users from DB\"\n                    }, void 0, false, {\n                        fileName: \"/home/kennedy/PHASE-4/instatalk/client/pages/index.js\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"All users from db will be displayed here\"\n                    }, void 0, false, {\n                        fileName: \"/home/kennedy/PHASE-4/instatalk/client/pages/index.js\",\n                        lineNumber: 55,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/kennedy/PHASE-4/instatalk/client/pages/index.js\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/home/kennedy/PHASE-4/instatalk/client/pages/index.js\",\n            lineNumber: 51,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/kennedy/PHASE-4/instatalk/client/pages/index.js\",\n        lineNumber: 50,\n        columnNumber: 3\n    }, undefined));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUErRDtBQUV6QjtBQUl0QyxLQUFLLENBQUNLLElBQUksT0FBUyxDQUFDO0lBQ2xCLEtBQUssQ0FBQyxDQUFDLENBQUNDLEtBQUssRUFBQyxDQUFDLEdBQUdGLHFEQUFRO0lBRTFCLEtBQUssTUFBRUcsV0FBVyxNQUFFQyxjQUFjLE1BQUlQLCtDQUFRLENBQUMsS0FBSztJQUdwRCxLQUFLLENBQUNRLFNBQVMsR0FBR1AsNkNBQU0sQ0FBQyxJQUFJO0lBRTdCLEtBQUssQ0FBQ1EsU0FBUyxHQUFHUiw2Q0FBTSxDQUFDLElBQUk7SUFFN0IsS0FBSyxDQUFDUyxZQUFZLElBQUlDLFNBQVMsR0FBSyxDQUFDO1FBQ25DLEtBQUssQ0FBQyxDQUFDLENBQUNDLE9BQU8sRUFBQyxDQUFDLEdBQUdKLFNBQVM7UUFFN0IsS0FBSyxDQUFDSyxZQUFZLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBVSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRztRQUV6RCxFQUFFLEVBQUVKLFNBQVMsS0FBSyxDQUFNLE9BQUUsQ0FBQztZQUN6QkMsT0FBTyxDQUFDSSxVQUFVLElBQUlILFlBQVk7UUFDcEMsQ0FBQyxNQUFNLENBQUM7WUFDTkQsT0FBTyxDQUFDSSxVQUFVLElBQUlILFlBQVk7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFFRCxFQUFzRTtJQUN0RSxLQUFLLENBQUNJLFlBQVksT0FBUyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxDQUFDLENBQUNMLE9BQU8sRUFBQyxDQUFDLEdBQUdKLFNBQVM7UUFDN0IsS0FBSyxDQUFDLENBQUMsQ0FBQ0ksT0FBTyxFQUFFTSxNQUFNLEVBQUMsQ0FBQyxHQUFHVCxTQUFTO1FBRXJDLEVBQUUsR0FBRUcsT0FBTyxhQUFQQSxPQUFPLEtBQVBBLElBQUksQ0FBSkEsQ0FBb0IsR0FBcEJBLElBQUksQ0FBSkEsQ0FBb0IsR0FBcEJBLE9BQU8sQ0FBRU8sV0FBVyxNQUFJRCxNQUFNLGFBQU5BLE1BQU0sS0FBTkEsSUFBSSxDQUFKQSxDQUFtQixHQUFuQkEsSUFBSSxDQUFKQSxDQUFtQixHQUFuQkEsTUFBTSxDQUFFRSxXQUFXLEdBQUUsTUFBTSxDQUFDYixjQUFjLENBQUMsS0FBSztRQUM1RSxNQUFNLENBQUNBLGNBQWMsQ0FBQyxJQUFJO0lBQzVCLENBQUM7SUFFRCxFQUF1QjtJQUN2QlIsZ0RBQVMsS0FBTyxDQUFDO1FBQ2ZrQixZQUFZO1FBQ1pILE1BQU0sQ0FBQ08sZ0JBQWdCLENBQUMsQ0FBUSxTQUFFSixZQUFZO1FBRTlDLE1BQU0sS0FBTyxDQUFDO1lBQ1pILE1BQU0sQ0FBQ1EsbUJBQW1CLENBQUMsQ0FBUSxTQUFFTCxZQUFZO1FBQ25ELENBQUM7SUFDSCxDQUFDO0lBR0QsTUFBTSw2RUFDTE0sQ0FBRztRQUFDQyxTQUFTLEVBQUMsQ0FBaUM7OEZBQzNDRCxDQUFHO1lBQUNDLFNBQVMsRUFBQyxDQUFvQjtrR0FFbENELENBQUc7O2dHQUNERSxDQUFFO3dCQUFDRCxTQUFTLEVBQUMsQ0FBa0c7a0NBQUMsQ0FBdUI7Ozs7OztnR0FDdklDLENBQUU7a0NBQUMsQ0FBd0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQnBELENBQUM7QUFFRCxpRUFBZXJCLElBQUksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vZGVsc3MvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZiwgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICduZXh0LXRoZW1lcyc7XG5cblxuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICBjb25zdCB7IHRoZW1lIH0gPSB1c2VUaGVtZSgpO1xuXG4gIGNvbnN0IFtoaWRlQnV0dG9ucywgc2V0SGlkZUJ1dHRvbnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG5cbiAgY29uc3Qgc2Nyb2xsUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IHBhcmVudFJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBoYW5kbGVTY3JvbGwgPSAoZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgeyBjdXJyZW50IH0gPSBzY3JvbGxSZWY7XG5cbiAgICBjb25zdCBzY3JvbGxBbW91bnQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDE4MDAgPyAyNzAgOiAyMTA7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgIGN1cnJlbnQuc2Nyb2xsTGVmdCAtPSBzY3JvbGxBbW91bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnQuc2Nyb2xsTGVmdCArPSBzY3JvbGxBbW91bnQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNoZWNrIGlmIHNjcm9sbFJlZiBjb250YWluZXIgaXMgb3ZlcmZpbGxpbmcgaXRzIHBhcmVudFJlZiBjb250YWluZXJcbiAgY29uc3QgaXNTY3JvbGxhYmxlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY3VycmVudCB9ID0gc2Nyb2xsUmVmO1xuICAgIGNvbnN0IHsgY3VycmVudDogcGFyZW50IH0gPSBwYXJlbnRSZWY7XG5cbiAgICBpZiAoY3VycmVudD8uc2Nyb2xsV2lkdGggPj0gcGFyZW50Py5vZmZzZXRXaWR0aCkgcmV0dXJuIHNldEhpZGVCdXR0b25zKGZhbHNlKTtcbiAgICByZXR1cm4gc2V0SGlkZUJ1dHRvbnModHJ1ZSk7XG4gIH07XG5cbiAgLy8gaWYgd2luZG93IGlzIHJlc2l6ZWRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpc1Njcm9sbGFibGUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaXNTY3JvbGxhYmxlKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaXNTY3JvbGxhYmxlKTtcbiAgICB9O1xuICB9KTtcblxuXG4gIHJldHVybihcbiAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHNtOnB4LTIgcC0yXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtaW5tZDp3LTQvNVwiPlxuICAgIFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImZvbnQtcG9wcGlucyBkYXJrOnRleHQtd2hpdGUgdGV4dC1uZnQtYmxhY2stMSB0ZXh0LTJ4bCBtaW5sZzp0ZXh0LTR4bCBmb250LXNlbWlib2xkIG1sLTQgeHM6bWwtMFwiPkZldGNoIGFsbCB1c2VycyBmcm9tIERCPC9oMT5cbiAgICAgICAgPGgxPkFsbCB1c2VycyBmcm9tIGRiIHdpbGwgYmUgZGlzcGxheWVkIGhlcmU8L2gxPlxuICAgICBcblxuICAgICAgICBcblxuPC9kaXY+XG48L2Rpdj5cblxuXG5cbiAgICAgIDwvZGl2PlxuICAgIFxuXG5cbiAgICAgICAgICAgIFxuKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJlZiIsInVzZUNvbnRleHQiLCJ1c2VUaGVtZSIsIkhvbWUiLCJ0aGVtZSIsImhpZGVCdXR0b25zIiwic2V0SGlkZUJ1dHRvbnMiLCJzY3JvbGxSZWYiLCJwYXJlbnRSZWYiLCJoYW5kbGVTY3JvbGwiLCJkaXJlY3Rpb24iLCJjdXJyZW50Iiwic2Nyb2xsQW1vdW50Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsInNjcm9sbExlZnQiLCJpc1Njcm9sbGFibGUiLCJwYXJlbnQiLCJzY3JvbGxXaWR0aCIsIm9mZnNldFdpZHRoIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJoMSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "next-themes":
/*!******************************!*\
  !*** external "next-themes" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next-themes");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();