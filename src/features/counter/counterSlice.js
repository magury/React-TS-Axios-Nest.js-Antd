import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit ���������� reducers �б�д mutating �߼���
      // ��ʵ���ϲ�û�� mutate state ��Ϊ��ʹ���� Immer �⣬
      // ����⵽�ݸ� state �ı仯������һ��ȫ�µĻ�����Щ���ĵĲ��ɱ� state
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Ϊÿ�� case reducer �������� Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
