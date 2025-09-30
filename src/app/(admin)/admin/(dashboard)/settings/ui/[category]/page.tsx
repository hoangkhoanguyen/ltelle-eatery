"use client";
import Setting from "@/components/admin/features/settings/Setting";
import Header from "@/components/admin/shared/header/Header";
import { Button } from "@/components/admin/ui/button";
import { homepageMeta } from "@/constants/settings/homepage";
import { homepageConfigs } from "@/lib/mock";

import React from "react";

const page = ({}: { params: Promise<{ category: string }> }) => {
  return (
    <div>
      <Header
        title="Cấu hình giao diện Trang chủ"
        actions={
          <div className="card-actions">
            <Button color="primary">Save</Button>
            <Button>Discard</Button>
          </div>
        }
      />
      <div className="container py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Setting
            settingData={homepageConfigs.value}
            meta={homepageMeta.hero}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
