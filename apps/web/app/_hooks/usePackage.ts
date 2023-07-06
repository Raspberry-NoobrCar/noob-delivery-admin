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
  loadPackage: (uid: string) => void;
  unLoadPackage: (uid: string) => void;
}

const usePackage = create<PackageStore>((set, get) => ({
    loading: false,
    packagesInList: [],
    setPackageInList: (nextValue) => set({ packagesInList: nextValue }),
    packagesInCar: [],
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
    },
    loadPackage: (uid: string) => {
      const { packagesInList, packagesInCar, setPackageInCar, setPackageInList } = get();
      let target: Package | undefined = undefined;
      const nextList = packagesInList.map(item => {
        if (item.uid === uid) {
          target = item;
          target.status = "delivering"
          return target;
        } else return item;
      })
      if (!target) {
        console.error(`Load unknown package: ${uid}`);
        return;
      } else {
        setPackageInCar([...packagesInCar, target]);
        setPackageInList(nextList);
      }
    },
    unLoadPackage: (uid: string) => {
      const { packagesInList, packagesInCar, setPackageInCar, setPackageInList } = get();
      let target: Package | undefined = undefined;
      const nextList = packagesInList.map(item => {
        if (item.uid === uid) {
          target = item;
          target.status = "finished"
          return target;
        } else return item;
      })
      if (!target) {
        console.error(`Unload unknown package: ${uid}`)
        return;
      } else {
        setPackageInCar(packagesInCar.filter(item => item.uid !== uid));
        setPackageInList(nextList);
      }
    }
  })
)

export default usePackage;