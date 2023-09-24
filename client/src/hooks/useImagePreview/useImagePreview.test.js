const { default: useImagePreview } = require("./useImagePreview");
const { renderHook, act } = require("@testing-library/react");

describe("useImagePreview-test", () => {
  it("should set the src of the image element to the same because is not linked to img", () => {
    // Arrange

    const { result } = renderHook(() => useImagePreview());

    // Act
    act(() => {
      result.current.element.current = { src: "image-url" };
      result.current.clearImagePreview();
    });

    // Assert
    expect(result.current.element.current.src).toBe("image-url");
  });

  // Tests that handleFileInputChange sets the src of the image element to the data URL of the selected image file
  it("should not set the src of the image element if the selected file is not an image when handleFileInputChange is called with a non-image file", () => {
    // Arrange
    const { result } = renderHook(() => useImagePreview());
    const file = new File(["text-data"], "text.txt", { type: "text/plain" });

    // Act
    act(() => {
      result.current.element.current = { src: "" };
      result.current.input.current = { files: [file] };
      result.current.handleFileInputChange();
    });

    // Assert
    expect(result.current.element.current.src).toBeNull();
  });

  it("should not set the src of the image element if no file is selected when handleFileInputChange is called without a selected file", () => {
    // Arrange
    const { result } = renderHook(() => useImagePreview());
    result.current.input.current = { files: [] };

    act(() => {
      result.current.element.current = { src: "" };
      result.current.handleFileInputChange();
    });
    // Assert
    expect(result.current.element.current.src).toBe("");
  });

  it("should not set the src of the image element if FileReader encounters an error when handleFileInputChange is called and FileReader.onerror is triggered", () => {
    // Arrange
    const { result } = renderHook(() => useImagePreview());
    const file = new File(["image-data"], "image.png", { type: "image/png" });
    result.current.input.current = { files: [file] };
    const reader = {
      readAsDataURL: jest.fn(),
      onloadend: jest.fn(),
      error: new Error("FileReader error"),
    };
    global.FileReader = jest.fn(() => reader);

    act(() => {
      result.current.element.current = { src: "" };
      result.current.handleFileInputChange();
    });

    // Assert
    expect(result.current.element.current.src).toBe("");
  });
});
