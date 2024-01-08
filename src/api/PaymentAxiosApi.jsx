// import axios from "axios";
import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";

const PaymentAxiosApi = {
  // 결제 내역 저장
  payAdd: async (
    merchant_uid,
    userName,
    userPhone,
    userEmail,
    fee,
    postTitle,
    postUserName,
    postPhoneNum
  ) => {
    const payment = {
      userEmail: userEmail,
      phoneNum: userPhone,
      userName: userName,
      fee: fee,
      orderNum: merchant_uid,
      postTitle: postTitle,
      postUserName: postUserName,
      postPhoneNum: postPhoneNum,
    };
    return await customAxios.post(KH_DOMAIN + "/pay/add", payment);
  },

  // 광고 등록 시, 결제 내역에 adId 추가
  payAddAdId: async (adId, paymentId) => {
    const payment = {
      adId: adId,
      id: paymentId,
    };
    return await customAxios.post(KH_DOMAIN + "/pay/add/addAdId", payment);
  },

  // 전체 결제 내역 불러오기
  payGet: async () => {
    return await customAxios.get(KH_DOMAIN + "/pay/all");
  },

  // userId에 따른 결제 내역 불러오기
  payGetById: async (paymentId) => {
    return await customAxios.get(KH_DOMAIN + `/pay/detail/${paymentId}`);
  },

  // email에 따른 결제 내역 불러오기
  payGetByEmail: async (email) => {
    return await customAxios.get(KH_DOMAIN + `/pay/detail/${email}`);
  },
};
export default PaymentAxiosApi;
