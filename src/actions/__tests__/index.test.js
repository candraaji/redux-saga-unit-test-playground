import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  getAllProducts,
  receiveProducts,
  addToCart,
  removeFromCart,
  checkout,
  checkoutSuccess,
  checkoutFailure,
  GET_ALL_PRODUCTS,
  RECEIVE_PRODUCTS,
} from "../index";

describe("Action Function Test", () => {
  it("should be call getAllProducts function", () => {
    const expectedData = {
      type: GET_ALL_PRODUCTS,
    };

    expect(getAllProducts()).toStrictEqual(expectedData);
  });
  it("should be call receiveProducts function", () => {
    const mockProductData = [{ 3: 1 }, { 2: 5 }];

    const expectedData = {
      type: RECEIVE_PRODUCTS,
      products: mockProductData,
    };

    expect(receiveProducts(mockProductData)).toStrictEqual(expectedData);
  });
  it("should be call addToCart function", () => {
    const mockProductData = [1, 2, 3];

    const expectedData = {
      type: ADD_TO_CART,
      productId: mockProductData,
    };

    expect(addToCart(mockProductData)).toStrictEqual(expectedData);
  });
  it("should be call removeFromCart function", () => {
    const mockProductData = [1, 2, 3];

    const expectedData = {
      type: REMOVE_FROM_CART,
      productId: mockProductData,
    };

    expect(removeFromCart(mockProductData)).toStrictEqual(expectedData);
  });
  it("should be call checkout function", () => {
    const expectedData = {
      type: CHECKOUT_REQUEST,
    };

    expect(checkout()).toStrictEqual(expectedData);
  });
  it("should be call checkout success function", () => {
    const mockProductData = [{ 3: 1 }, { 2: 5 }];
    const expectedData = {
      type: CHECKOUT_SUCCESS,
      cart: mockProductData,
    };

    expect(checkoutSuccess(mockProductData)).toStrictEqual(expectedData);
  });
  it("should be call checkout fail function", () => {
    const errorMessage = "expected error";
    const expectedData = {
      type: CHECKOUT_FAILURE,
      error: errorMessage,
    };

    expect(checkoutFailure(errorMessage)).toStrictEqual(expectedData);
  });
});
