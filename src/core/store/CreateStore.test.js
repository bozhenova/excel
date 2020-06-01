import { CreateStore } from './CreateStore';

const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: ++state.count };
  }
  return state;
};

describe('CreateStore: ', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = new CreateStore(reducer, initialState);
    handler = jest.fn();
  });

  test('should be defined', () => {
    expect(store).toBeDefined();
  });

  test('should return the state object', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('should return the initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('should change the state if action exists', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
  });

  test("should NOT change the state if action doesn't exist", () => {
    store.dispatch({ type: 'NOT_EXISTENT_ACTION' });
    expect(store.getState().count).toBe(0);
  });

  test('should call subscriber function', () => {
    store.subscribe(handler);

    store.dispatch({ type: 'ADD' });
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('should NOT call sub if unsubscribed', () => {
    const sub = store.subscribe(handler);

    sub();

    store.dispatch({ type: 'ADD' });
    expect(handler).not.toHaveBeenCalled();
  });

  test('should dispatch asynchronously', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' });
      }, 500);
      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
