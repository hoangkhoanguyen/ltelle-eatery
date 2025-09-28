"use client";
import SettingsItem from "@/components/admin/features/settings/SettingsItem";
import Header from "@/components/admin/shared/header/Header";
import { Button } from "@/components/admin/ui/button";
import React from "react";

const page = ({}: { params: Promise<{ category: string }> }) => {
  return (
    <div>
      <Header
        title="Cấu hình giao diện Tổng quan"
        actions={
          <div className="card-actions">
            <Button color="primary">Save</Button>
            <Button>Discard</Button>
          </div>
        }
      />
      <div className="container py-5">
        <SettingsItem />
      </div>
    </div>
  );
};

export default page;
