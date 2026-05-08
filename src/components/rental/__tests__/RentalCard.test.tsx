import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RentalCard from "@/components/rental/RentalCard";

describe("RentalCard", () => {
  it("renders key property information", () => {
    render(
      <RentalCard
        propertyName="代官山駅前レジデンス"
        rentPrice="¥128,000"
        stationWalk={5}
        buildingAge={12}
        area="42.5㎡"
      />,
    );

    expect(screen.getByText("代官山駅前レジデンス")).toBeInTheDocument();
    expect(screen.getByText("¥128,000")).toBeInTheDocument();
    expect(screen.getByText("築12年 / 42.5㎡")).toBeInTheDocument();
    expect(screen.getByText("最寄駅 徒歩5分")).toBeInTheDocument();
  });

  it("shows new ribbon in newArrival variant", () => {
    render(
      <RentalCard
        propertyName="テスト物件"
        rentPrice="¥100,000"
        stationWalk={3}
        buildingAge={5}
        area="30㎡"
        variant="newArrival"
      />,
    );

    expect(screen.getByText("NEW")).toBeInTheDocument();
  });
});
