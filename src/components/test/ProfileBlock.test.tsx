import ProfileBlock from "../ProfileBlock";
import { mount } from "enzyme";
import { getPrefabProfile } from "../../test/testProfiles";
import { componentWithStore, createMockStore } from "../../test/testhelpers";
import { getPreFabSocialGraph } from "../../test/testGraphs";
import * as wallet from "../../services/wallets/wallet";

const profile = getPrefabProfile(0);
const graphs = getPreFabSocialGraph();
const walletType = wallet.WalletType.TORUS;
const store = createMockStore({
  user: { profile, walletType },
  profiles: { profiles: [profile] },
  graphs: { graphs: graphs },
});

describe("Profile Block", () => {
  it("renders without crashing", () => {
    expect(() => {
      mount(componentWithStore(ProfileBlock, store));
    }).not.toThrow();
  });

  it("displays login prompt when not logged in", () => {
    const store = createMockStore({
      user: { undefined },
      profiles: { profiles: [profile] },
      graphs: { graphs: graphs },
    });
    const component = mount(componentWithStore(ProfileBlock, store));
    expect(component.find("ProfileBlock").text()).toContain(
      "Login With MetaMask/Taurus"
    );
  });

  it("editable on edit button click", () => {
    const component = mount(componentWithStore(ProfileBlock, store));
    component.find(".ProfileBlock__editButton").first().simulate("click");
    expect(component.find(".ProfileBlock__name").props().disabled).toEqual(
      false
    );
    expect(component.find(".ProfileBlock__handle").props().disabled).toEqual(
      false
    );
  });

  describe("save button click", () => {
    it("save button disabled when not edited", () => {
      const component = mount(componentWithStore(ProfileBlock, store));
      component.find(".ProfileBlock__editButton").first().simulate("click");
      expect(
        component.find(".ProfileBlock__editButton").first().props().disabled
      ).toEqual(true);
    });
    it("save button enabled when edited", () => {
      const component = mount(componentWithStore(ProfileBlock, store));
      component.find(".ProfileBlock__editButton").first().simulate("click");
      component
        .find(".ProfileBlock__name")
        .simulate("change", { target: { value: "Monday NewLastName" } });
      expect(
        component.find(".ProfileBlock__editButton").first().props().disabled
      ).toEqual(false);
    });
  });

  it("cancels on cancel button click", () => {
    const component = mount(componentWithStore(ProfileBlock, store));
    component.find(".ProfileBlock__editButton").first().simulate("click");
    component
      .find(".ProfileBlock__name")
      .simulate("change", { target: { value: "Monday TestLastName" } });
    expect(component.find(".ProfileBlock__name").props().value).toEqual(
      "Monday TestLastName"
    );
    component.find(".ProfileBlock__editButton").last().simulate("click");
    expect(component.find(".ProfileBlock__name").props().value).toEqual(
      "Monday January"
    );
  });
});