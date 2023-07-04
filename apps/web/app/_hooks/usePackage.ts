import { Package } from "@/interfaces";
import { create } from "zustand";
import { PackageService } from "@/services";

interface PackageStore {
  loading: boolean;
  packagesInList: Package[];
  setPackageInList: (nextValue: Package[]) => void;
  packagesInCar: Package[];
  setPackageInCar: (nextValue: Package[]) => void;
  total: number;
  fetch: () => ReturnType<typeof PackageService.getList>;
}

const mockPackageInCar: Package[] = [
  { receiverName: "j10c", uid: "rb12303", destination: "l01", contact: "blyb1739@gmail.com", status: "delivering" },
  { receiverName: "j10c", uid: "rb12304", destination: "l01", contact: "blyb1739@gmail.com", status: "delivering" },
  { receiverName: "j10c", uid: "rb12305", destination: "l01", contact: "blyb1739@gmail.com", status: "delivering" },
  { receiverName: "j10c", uid: "rb12306", destination: "l01", contact: "blyb1739@gmail.com", status: "delivering" },
  { receiverName: "j20c", uid: "rb12307", destination: "l01", contact: "blyb1739@gmail.com", status: "delivering" },
  { receiverName: "j30c", uid: "rb12308", destination: "l01", contact: "blyb1739@gmail.com", status: "delivering" },
]

const usePackage = create<PackageStore>((set, get) => ({
    loading: false,
    packagesInList: [],
    setPackageInList: (nextValue) => set({ packagesInList: nextValue }),
    packagesInCar: mockPackageInCar,
    setPackageInCar: (nextValue) => set({ packagesInCar: nextValue }),
    total: 0,
    fetch: async () => {
      set({ loading: true });
      const res = await PackageService.getList();
      set({
        loading: false,
        packagesInList: res.data.list.map(item => ({...item, status: "waiting" })),
        total: res.data.count
      });
      return res;
    }
  })
)

export default usePackage;