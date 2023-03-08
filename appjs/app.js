import displayAdminInterface from "./admin/interface.js";
import { displayFilters } from "./components/filters.js";
import { isConnected } from "./components/login.js";
import { displayPortfolio } from "./components/portfolio.js";
import { fetchApi } from "./utils/fetch.js";

globalThis.currentFile = '';
globalThis.createList = [];
globalThis.deleteList = [];

displayPortfolio();
isConnected() ? displayAdminInterface() : displayFilters()
