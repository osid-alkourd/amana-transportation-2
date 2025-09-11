"use client";
import Navbar from "./components/Navbar/Navbar";
import HeaderSection from "./components/HeaderSection/HeaderSection";
import SectionTitle from "./components/SectionTitle/SectionTitle";
import BusSelector from "./components/BusSelector/BusSelector";
import BusMap from "./components/BusMap/BusMap";
import BusSchedule from "./components/BusSchedule/BusSchedule";
import Footer from "./components/Footer/Footer";
import { useState } from "react";


export default function Home() {
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

  return (
    <div className="App">
      {/* شريط التنقل */}
      <Navbar />
      {/* العنوان الرئيسي */}
      <HeaderSection />
      {/* خريطة الباص */}
      <SectionTitle title="Active Bus Map" />
      <BusSelector
        selectedBusId={selectedBusId}
        onSelectBus={setSelectedBusId}
      />{" "}
      <BusMap selectedBusId={selectedBusId} />
      {/* جدول مواعيد الباص */}
      <SectionTitle title="Bus Schedule" />
      <BusSelector />
      <BusSchedule />
      {/* الفوتر */}
      <Footer />
    </div>
  );
}
