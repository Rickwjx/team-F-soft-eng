import React, {useCallback, useEffect, useState} from "react";
import MapNode from "common/src/map/MapNode.ts";
import {NodeType} from "common/src/map/MapNodeType.ts";
import FilterManager, {FilterValueType, generateFilterValue} from "common/src/filter/FilterManager.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";

import elevatorImage from "../images/realMapIcons/elevator.svg";
import deptImage from "../images/realMapIcons/dept.svg";
import labsImage from "../images/realMapIcons/labs.svg";
import stairsImage from "../images/realMapIcons/stairs.svg";
import bathroomImage from "../images/realMapIcons/bathrom.svg";
import serviceImage from "../images/realMapIcons/service.svg";
import retailImage from "../images/realMapIcons/retail.png";
import infoImage from "../images/realMapIcons/info.svg";
import confImage from "../images/realMapIcons/conf.png";
import exitImage from "../images/realMapIcons/exit.png";
import hallImage from "../images/realMapIcons/hall.svg";
import {FilterType, ValidFilterTypeList} from "../common/types/FilterType.ts";
// import floorImage from "../../../images/realMapIcons/floors.png";

export interface IFilterState {
  filterValue: FilterValueType;
  renderInfo?: IRenderInfo
  active: boolean;
}

export interface IRenderInfo {
  filterType: FilterType;
  iconColor: string;
  filterName: string;
  img: string;
}

const filterRenderInfo: Map<FilterType, IRenderInfo> = new Map([
  [NodeType.CONF, {
    iconColor: "#1CA7EC",
    filterName: "Conference",
    filterType: NodeType.CONF,
    img: confImage,
  }],
  [NodeType.DEPT, {
    iconColor: "#72c41c",
    filterName: "Department",
    filterType: NodeType.DEPT,
    img: deptImage,
  }],
  [NodeType.LABS, {
    iconColor: "#e88911",
    filterName: "Labs",
    filterType: NodeType.LABS,
    img: labsImage,
  }],
  [NodeType.SERV, {
    iconColor: "#e88911",
    filterName: "Service",
    filterType: NodeType.SERV,
    img: serviceImage,
  }],
  [NodeType.INFO, {
    iconColor: "#1CA7EC",
    filterName: "Info",
    filterType: NodeType.INFO,
    img: infoImage,
  }],
  [NodeType.REST, {
    iconColor: "#72c41c",
    filterName: "Restrooms",
    filterType: NodeType.REST,
    img: bathroomImage,
  }],
  [NodeType.RETL, {
    iconColor: "#e88911",
    filterName: "Retail",
    filterType: NodeType.RETL,
    img: retailImage,
  }],
  [NodeType.STAI, {
    iconColor: "#72c41c",
    filterName: "Stairs",
    filterType: NodeType.STAI,
    img: stairsImage,
  }],
  [NodeType.ELEV, {
    iconColor: "#1CA7EC",
    filterName: "Elevators",
    filterType: NodeType.ELEV,
    img: elevatorImage,
  }],
  [NodeType.EXIT, {
    iconColor: "red",
    filterName: "Exits",
    filterType: NodeType.EXIT,
    img: exitImage,
  }],
  [NodeType.HALL, {
    iconColor: "#7e36c2",
    filterName: "Hall",
    filterType: NodeType.HALL,
    img: hallImage,
  }]
]);

export const useFilters = (includeHalls: boolean): [
  MapNode[],
  boolean,
  Map<FilterType, IFilterState>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<MapNode[]>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<{
    type: FilterType,
    active: boolean
  } | null>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [nodeData, setNodeData] = useState<MapNode[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);

  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);

  const [filterAssociations, setFilterAssociations] = useState<Map<FilterType, IFilterState>>(new Map());
  const [filtersRegistered, setFiltersRegistered] = useState<boolean>(false);

  const [newFilterActiveStatus, setNewFilterActiveStatus] = useState<{type: FilterType, active: boolean} | null>(null);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectNone, setSelectNone] = useState<boolean>(false);

  /**
   * Helper callback function that sets a given filter association's active status to the passed in status
   */
  const setFilterActiveState = useCallback((filterType: FilterType, newActiveStatus: boolean, updateFilterApplied: boolean) => {
    const newFilterState: IFilterState | undefined = filterAssociations.get(filterType);
    const oldFilterAssociations = filterAssociations;

    if(newFilterState) {
      newFilterState.active = newActiveStatus;
      oldFilterAssociations.set(filterType, newFilterState);
      setFilterAssociations(oldFilterAssociations);
      if(updateFilterApplied) setFiltersApplied(false);
    }
  }, [filterAssociations]);

  /**
   * If filters have not been generated for all node types yet, generate them
   */
  useEffect(() => {
    if(!filtersRegistered) {
      console.log("Registering filters");
      const newRegisteredFilters: Map<FilterType, IFilterState> = new Map<FilterType, IFilterState>();
      for(const type of ValidFilterTypeList) {
        if(!includeHalls && (type == NodeType.HALL)) continue;
        newRegisteredFilters.set(type, {
          filterValue: generateFilterValue(false, type),
          renderInfo: filterRenderInfo.get(type),
          active: true,
        });
      }

      setFilterAssociations(newRegisteredFilters);
      setFiltersRegistered(true);
    }
  }, [filtersRegistered, includeHalls]);

  /**
   * If the flag is set to change the status of a filter association, set the state to the new state
   */
  useEffect(() => {
    if(filtersRegistered && newFilterActiveStatus) {
      if(filterAssociations.has(newFilterActiveStatus.type)) {
        console.log(`Received new state for filter type ${newFilterActiveStatus.type}`);
        setFilterActiveState(newFilterActiveStatus.type, newFilterActiveStatus.active, true);
      }
    }
  }, [filterAssociations, filtersRegistered, newFilterActiveStatus, setFilterActiveState]);

  /**
   * If filters are registered, not applied, and the data is loaded, calculate the set of filtered nodes
   */
  useEffect(() => {
    if(!filtersApplied && filtersRegistered && nodeDataLoaded) {
      console.log("Reapplying filters to node data");
      const activeFilterValues: FilterValueType[] = [];

      for(const filterState of filterAssociations.values()) {
        if(filterState.active) activeFilterValues.push(filterState.filterValue);
      }

      const typeFilter: Filter = FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, activeFilterValues)!;

      const filteredNodes: MapNode[] = FilterManager.getInstance().applyFilters([typeFilter], nodeData);

      setFilteredNodes(filteredNodes);
      setFiltersApplied(true);
    }
  }, [nodeData, filterAssociations, filtersRegistered, nodeDataLoaded, filtersApplied]);

  /**
   * If the request to select all filters is set from the program, set all active states for all filters to true
   */
  useEffect(() => {
    if(selectAll && filtersRegistered) {
      for(const type of ValidFilterTypeList) {
        setFilterActiveState(type, true, false);
      }
      setSelectAll(false);
      setFiltersApplied(false);
    }
  }, [filtersRegistered, selectAll, setFilterActiveState]);

  /**
   * If the request to select no filters is set from the program, set all active states for all filters to false
   */
  useEffect(() => {
    if(selectNone && filtersRegistered) {
      for(const type of ValidFilterTypeList) {
        setFilterActiveState(type, false, false);
      }
      setSelectNone(false);
      setFiltersApplied(false);
    }
  }, [filtersRegistered, selectNone, setFilterActiveState]);

  return [
    filteredNodes,
    filtersApplied,
    filterAssociations,
    setFiltersApplied,
    setNodeData,
    setNodeDataLoaded,
    setNewFilterActiveStatus,
    setSelectAll,
    setSelectNone
  ];
};
