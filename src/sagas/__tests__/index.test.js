import {
  getAllProducts,
  checkout,
  watchCheckout,
  watchGetProducts,
} from "../index";
import { runSaga } from "redux-saga";
import * as actions from "../../actions";
import { select } from "redux-saga/effects";
import { getCart } from "../../reducers";
import { api } from "../../services";

describe("Saga Test", () => {
  let dispatchedActions = [];
  let fakeStore = {
    getState: () => ({
      checkoutStatus: {
        checkoutPending: false,
        error: null,
      },
      quantityById: {},
    }),
    dispatch: (action) => dispatchedActions.push(action),
  };
  const action = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be test getAllProducts Saga", async () => {
    const mockedProduct = [
      { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
      { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10 },
      { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 },
    ];
    api.getProducts = jest.fn(() => Promise.resolve(mockedProduct));

    await runSaga(fakeStore, getAllProducts, action).done;
    expect(api.getProducts.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual({
      type: actions.RECEIVE_PRODUCTS,
      products: mockedProduct,
    });
  });
  it("should be test checkout Saga Success", async () => {
    const mockedProduct = [{ 1: 2 }];
    api.buyProducts = jest.fn(() => Promise.resolve(mockedProduct));

    await runSaga(fakeStore, checkout, getCart).done;
    expect(api.buyProducts.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual({
      type: actions.CHECKOUT_SUCCESS,
    });
  });
  it("should be test checkout Saga Fail", async () => {
    const mockedResponse = {
      statusCode: 500,
      errorMessage: "eror expected on call api",
    };
    api.buyProducts = jest.fn(() => Promise.reject(mockedResponse));

    await runSaga(fakeStore, checkout, getCart).done;
    expect(api.buyProducts.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual({
      type: actions.CHECKOUT_FAILURE,
      error: mockedResponse,
    });
  });
});
