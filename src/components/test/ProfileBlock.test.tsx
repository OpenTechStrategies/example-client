import React from "react";
import ProfileBlock from "../ProfileBlock";
import { shallow } from "enzyme";
import { getPrefabProfile } from "../../test/testProfiles";

const mockProfile = getPrefabProfile(0);
const mockSocialAddress = mockProfile.address;
const mockWalletAddress = mockProfile.address;

describe("Profile", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(
        <ProfileBlock
          socialAddress={mockSocialAddress}
          walletAddress={mockWalletAddress}
          profile={mockProfile}
        />
      );
    }).not.toThrow();
  });
});