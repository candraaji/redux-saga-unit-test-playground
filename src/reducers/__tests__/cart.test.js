import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
} from "../../actions";
import {
  checkoutStatus,
  quantityById,
  getQuantity,
  getAddedIds,
} from "../cart";

describe("checkoutStatus Reducer Test", () => {
  it("should be return initial state when get the default case", () => {
    const mockState = {
      checkoutPending: false,
      error: null,
    };
    expect(checkoutStatus(undefined, {})).toEqual(mockState);
  });
  it("should be return correct state when request checkout", () => {
    const mockState = {
      checkoutPending: true,
      error: null,
    };
    const actionRequest = {
      type: CHECKOUT_REQUEST,
    };
    expect(checkoutStatus(undefined, actionRequest)).toEqual(mockState);
  });
  it("should be return correct state when checkout success", () => {
    const mockState = {
      checkoutPending: false,
      error: null,
    };
    const actionRequest = {
      type: CHECKOUT_SUCCESS,
    };
    expect(checkoutStatus(undefined, actionRequest)).toEqual(mockState);
  });
  it("should be return correct state when checkout failure", () => {
    const mockState = {
      checkoutPending: false,
      error: "expected error will show",
    };
    const actionRequest = {
      type: CHECKOUT_FAILURE,
      error: "expected error will show",
    };
    expect(checkoutStatus(undefined, actionRequest)).toEqual(mockState);
  });
});

describe("quantityById Reducer Test", () => {
  it("should be return initial state when get the default case", () => {
    const mockState = {};
    expect(quantityById(undefined, {})).toEqual(mockState);
  });
  it("should be return correct state when checkout success", () => {
    const mockState = {};
    const actionRequest = {
      type: CHECKOUT_SUCCESS,
    };
    expect(quantityById(undefined, actionRequest)).toEqual(mockState);
  });
  it("should be return correct state when add to cart multiple times", () => {
    const mockState = {
      2: 1,
    };
    const actionRequest = {
      type: ADD_TO_CART,
      productId: 2,
    };
    expect(quantityById(undefined, actionRequest)).toEqual(mockState);
    const actionRequestTwo = {
      type: ADD_TO_CART,
      productId: 2,
    };
    const mockStateTwo = {
      2: 2,
    };
    expect(quantityById(mockState, actionRequestTwo)).toEqual(mockStateTwo);
  });
  it("should be return correct state when cart is empty and remove", () => {
    const mockState = {};
    const actionRequest = {
      type: REMOVE_FROM_CART,
      productId: 2,
    };
    expect(quantityById(undefined, actionRequest)).toEqual(mockState);
  });
  it("should be return correct state when remove cart still have value", () => {
    const mockState = { 2: 10 };
    const actionRequest = {
      type: REMOVE_FROM_CART,
      productId: 2,
    };
    const expectedState = { 2: 9 };
    expect(quantityById(mockState, actionRequest)).toEqual(expectedState);
  });
  it("should be test function getQuantity", () => {
    const mockState = {
      quantityById: { 3: 6 },
    };
    expect(getQuantity(mockState, 3)).toEqual(6);
  });
  it("should be test function getAddedIds", () => {
    const mockState = {
      quantityById: { 3: 6 },
    };
    expect(getAddedIds(mockState)).toEqual(["3"]);
  });
});
