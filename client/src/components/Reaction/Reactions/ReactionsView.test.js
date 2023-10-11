import { screen } from "@testing-library/react";
import ReactionsView from "./ReactionsView";

describe("ReactionsView", () => {
  it("should render the component without errors", () => {
    // Mock the necessary dependencies
    const reqReactionsView = jest.fn();
    const reqReactions = jest.fn();
    const reqReaction = jest.fn();
    const nameView = "";

    // Render the component
    render(
      <ReactionsView
        id="jkj"
        reqReactionsView={reqReactionsView}
        reqReactions={reqReactions}
        reqReaction={reqReaction}
        name={nameView}
      />,
    );

    // Assert that there are no error messages
    expect(screen.queryByText("error")).toBeNull();
  });
});
