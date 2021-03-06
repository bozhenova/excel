import { Page } from '../core/Page';
import { Excel } from '../components/excel/Excel';
import { Header } from '../components/header/Header';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Formula } from '../components/formula/Formula';
import { Table } from '../components/table/Table';
import { CreateStore } from '../core/store/CreateStore';
import { rootReducer } from '../redux/rootReducer';
import { storage, debounce } from '../core/utils';
import { normalizeInitialState } from '../redux/initialState';

function storageName(param) {
  return `excel:${param}`;
}

export class ExcelPage extends Page {
  constructor(param) {
    super(param);
    this.storeSub = null;
  }

  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    const initialState = normalizeInitialState(state);
    const store = new CreateStore(rootReducer, initialState);

    const stateListener = debounce(state => {
      storage(storageName(params), state);
    }, 300);

    this.storeSub = store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
    this.storeSub();
  }
}
