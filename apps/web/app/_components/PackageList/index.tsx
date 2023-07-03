"use client"

import { Table, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Package } from "@/interfaces";
import { PackageService } from "@/services";

const PackageList = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    PackageService.getList().then(data => {
      setPackages(data.data.list.map(item => ({ ...item, status: "waiting" })));
    })
  }, []);

  const columns: ColumnType<Package>[] = [
    { title: "单号", dataIndex: "uid" },
    { title: "收货人", dataIndex: "receiverName" },
    { title: "目的地", dataIndex: "destination" },
    { title: "联系方式", dataIndex: "contact" },
    { title: "收货人", dataIndex: "receiverName" },
    { title: "状态", dataIndex: "status", render: (text) => {
      if (text === "waiting") return <Tag color="default">等待配送</Tag>;
      else if (text === "delivering") return <Tag color="blue">配送中</Tag>;
      else if (text === "finished") return <Tag color="blue">完成配送</Tag>;
    }},
  ]

  return (
    <div className="package-list" style={{ padding: "16px"}}>
      <Table
        bordered
        size="small"
        columns={columns}
        title={() => <strong>库存清单</strong>}
        dataSource={packages}
        pagination={{
          pageSize: 10
        }}
        rowKey="uid"
      />
    </div>
  )
}

export default PackageList;