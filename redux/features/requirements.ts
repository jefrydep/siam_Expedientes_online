// requirementsSlice.ts
import { Requisito } from "@/interfaces/RouteResponse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequirementsState {
  requirements: Requisito[];
}

const initialState: RequirementsState = {
  requirements: [],
};

export const requirementsSlice = createSlice({
  name: "requirements",
  initialState,
  reducers: {
    setRequirements: (state, action: PayloadAction<Requisito[]>) => {
      state.requirements = action.payload;
    },
    addRequirement: (state, action: PayloadAction<Requisito>) => {
      state.requirements.push(action.payload);
    },
  },
});

export const { setRequirements, addRequirement } = requirementsSlice.actions;
