import displayAdminInterface from "./admin/interface.js";
import { displayFilters } from "./components/filters.js";
import { isConnected } from "./components/login.js";
import { displayPortfolio } from "./components/portfolio.js";

globalThis.currentFile = '';
globalThis.createList = [];
globalThis.deleteList = [];

displayPortfolio();
isConnected() ? displayAdminInterface() : displayFilters()