/* eslint-disable no-undef */
import { accountLookUp } from "@/components/LoginView.vue";
// import { shallowMount } from "@vue/test-utils";

describe("accountLookUp", () => {
    const customerTest = {
        "account_name": "failingaverage",
        "id": 6590559,
        "first_name": "Tadashi",
        "last_name": "Makoto",
        "email": "mako1902@ymail.com"
    }
    it("should find an account", () => {
        expect(accountLookUp().toBe(customerTest))
    })
})