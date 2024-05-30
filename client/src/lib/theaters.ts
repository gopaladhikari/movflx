import { instance } from "@/config/axios";
import { GetAllTheater } from "@/types/theaters";

const getAllTheaters = async () => {
  try {
    const res = await instance.get<GetAllTheater>(
      "theaters/get-all-theaters"
    );

    return res.data;
  } catch (error) {
    return null;
  }
};

export { getAllTheaters };
