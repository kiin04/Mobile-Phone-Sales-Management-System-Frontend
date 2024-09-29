import React, { useEffect, useState } from "react";
import {
  WapperUploadFile,
  WappperLabel,
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComopnent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import Loading from "../../components/LoadingComponent/Loading";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Messages/Message";
import { updateUser } from "../../redux/slices/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error("Lỗi");
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };
  return (
    <div style={{ width: "1300px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="name">Name: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Họ và tên"
              value={name}
              onChange={handleOnchangeName}
              id="name"
            />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="email">Email: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Email"
              value={email}
              onChange={handleOnchangeEmail}
              id="email"
            />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="phone">Phone: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Số điện thoại"
              value={phone}
              onChange={handleOnchangePhone}
              id="phone"
            />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="address">Address: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Địa chỉ"
              value={address}
              onChange={handleOnchangeAddress}
              id="address"
            />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="avatar">Avatar: </WappperLabel>
            </div>
            <WapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              textButton="Cập nhật"
              type="primary"
              style={{
                width: "150px",
                height: "34px",
                background: "rgb(69, 136, 181)",
              }}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
