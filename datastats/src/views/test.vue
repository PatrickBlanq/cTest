<template>
  <div class="container">
      <div class="search generalBorder flex-row">
          <div class="box" style="width: 65px;; padding: 0px 20px;">
              <div class="box-1"></div>
          </div>
          <div class="flex-row">
              <div class="search-box">
                  <input type="text" class="search-input" v-model="epcoCode" placeholder="入力番号"
                      @keydown.enter="ordersearchClick" />
                  <span class="search-icon" @click="ordersearchClick"></span>
              </div>

              <div class="OrderType-div">
                  {{ OrderType }}
              </div>

          </div>
      </div>

      <div class="personInCharge generalBorder flex-row">
          <!-- 
          todo
          確認完成時  #E8F2FE 
          有未確認項目時  AEC3EF
          选中时    #396DF6
          未開始作業  #E7E6E6
          -->
          <div class="flex-row" style="flex: 7;">
              <div class="inChargeBordered-div" v-for="(item, index) in inChargeArryNames" :key="index">
                  <div v-for="(value, key) in item" :key="key" class="inChargeInner-div" @click="inChargeClick(index)"
                      :class="{ 'selected': isInChargeCharge === index }">
                      <div class="key">{{ key }}</div>
                      <div class="separator"></div>
                      <div class="value">{{ value }}</div>
                  </div>
              </div>
          </div>

          <div class="flex-row" style="flex: 1;  display: flex; align-items: center;padding-right: 15px;">
              <div class="viewAll imageStyle" title="切换OK项显示"
                  :style="{ backgroundImage: `url(${isViewAllActive ? eyeOpenImage : eyeCloseImage})` }"
                  @click="toggleViewCheckbox"></div>

              <div class="shift imageStyle" title="切换检查内容的中日文字显示"
                  :style="{ backgroundImage: `url(${!isShiftCheckingContent ? shiftJPImage : shiftZHImage})` }"
                  @click="shifting"></div>



              <div class="errorFeedBack imageStyle" title="只显示NG标识项" @click="toggleNGView"></div>
              <div class="exportExcel imageStyle" title="导出Excel"></div>
              <div class="setting imageStyle" title="前往设置页面" @click="openSettingLink"></div>
              <!--                 <div class="handOver" :style="{ cursor: isDutyEditable ? 'pointer' : 'default' }"
                               
                  @click="handOverClick()"></div> -->


              <div class="handOver" title="提交作业" :style="{ cursor: isDutyEditable ? 'pointer' : 'default' }"
                  @click="isDutyEditable ? handOverClick() : null">
              </div>

              <div v-if="isInspecterDialog" class="modal-overlay" @click.self="inspecterDialogClose">
                  <div class="modal">
                      <div style="width: 350px;">
                          <div
                              style="margin-bottom: 17px; color: #777; font-size: 1.1rem; font-weight: bold; text-align: center">
                              检图者交图</div>
                          <div class="modal-option" @click="InspecterDialogClick(false)" title="上一级会收到NG项，核实后进行修改">
                              NG项目返给上一级修改
                          </div>
                          <div class="modal-option" @click="InspecterDialogClick(true)"
                              title="如果保留NG项提交，NG项会作为日报的错误记录">
                              提交作业</div>
                          <div class="modal-option" @click="inspecterDialogClose" title="不进行任何操作，关闭窗口">取消</div>
                      </div>

                  </div>
              </div>


          </div>
      </div>

      <div class=" content generalBorder flex-row">
          <div :class="isMenuHidden ? 'menu' : 'hidden'">
              <div class="stretch" @click="toggleMenu"></div>
              <div :key="Object.keys(groupedData).join(',')" style="padding: 0 7px 0 7px; overflow-y: auto;">
                  <div v-if="isMenuHidden"
                      style="border-radius: 7px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); cursor: pointer; width: 100%; font-size: 14px; height: 40px;margin-bottom: 5px;  text-align: center; border: 1px solid #91AADF; display: flex; align-items: center; justify-content: center;"
                      v-for="menu in menuArry" :key="menu.name" @click="menuNameClick(menu.name)" :class="{
                          menuSelectedDisable: selectedMenukey === menu.name && menu.enable === 0,
                          activeMenu: selectedMenukey === menu.name && menu.enable == 1,
                          menuDisableColor: selectedMenukey !== menu.name && menu.enable === 0
                      }">
                      {{ menu.name }}
                  </div>
              </div>


          </div>
          <div class="checkingContent">

              <div class="table-header flex-row">
                  <div class="table-cell" style="border-right: 2px solid #ccc; ">NO</div>
                  <div class="table-cell" style="border-right: 2px solid #ccc; ">検査内容</div>
                  <div class="table-cell" style="border-right: 2px solid #ccc;">結果</div>
                  <div class="table-cell" style="border-right: 2px solid #ccc;">確認情報</div>
                  <div class="table-cell" style="border-right: 2px solid #ccc;">確認結果</div>
                  <div class="table-cell">チェック<br>バック</div>
              </div>

              <el-scrollbar ref="scrollableDiv" class="scrollabl-div">
                  <div v-for="(item, index) in selectedItems" :key="index">

                      <div v-if="item.checkingContentCN !== null && !item.isHidden && (item.children.length !== 0 || item.isShowSub)"
                          class="table-row">
                          <div class="table-cell" style="background-color: #DBE3F4;  ">{{ item.children.length !== 0 ?
                              item.no : '(' + item.father + '-' + item.no + ')' }} </div>
                          <div :style="{ backgroundColor: '#DBE3F4', cursor: item.children.length !== 0 ? 'pointer' : 'default' }"
                              @click="showSubClick(item)"
                              :class="{ 'checkContent': true, 'table-cell': true, 'text-red': item.checkItemCorrectID !== -1, 'text-black': item.checkItemCorrectID === -1 }">
                              {{ isShiftCheckingContent ? item.checkingContentCN : item.checkingContentJP }}
                              <div class="parentDiv">
                                  <div class="showSub" v-if="item.children.length !== 0"
                                      :style="{ backgroundImage: `url(${item.isShowSub ? showSubImage : closeSubImage})`, border: '0px dashed red' }">

                                  </div>
                              </div>
                          </div>


                          <!--  showType手动 0-[]OK, 自动 1-NG 2-OK -->
                          <!--    todo
                        <div v-if="item.showType === 0">OK</div>
                        <div v-else-if="item.showType === 1">NG</div>
                        <div v-else-if="item.showType === 2">OK</div> 
                        -->
                          <div v-if="item.showType === 0" class="table-cell"
                              @click="isDutyEditable ? checkboxClick(item) : null"
                              :style="{ cursor: isDutyEditable ? 'pointer' : 'default', backgroundColor: '#DBE3F4' }">
                              <div class="checkbox-container"
                                  :style="{ cursor: isDutyEditable ? 'pointer' : 'default' }"> <input type="checkbox"
                                      :id="item.itemID" :style="{ cursor: isDutyEditable ? 'pointer' : 'default' }"
                                      v-model="item.isChecked" :disabled="!isDutyEditable" />
                                  <label :style="{ cursor: isDutyEditable ? 'pointer' : 'default' }">OK</label>
                              </div>
                          </div>
                          <!--    自动检图背景色 -->
                          <div class="table-cell" style="background-color: #D9D9D9;">-</div>
                          <div class="table-cell" style="background-color: #D9D9D9;">-</div>
                          <!--    todo -->
                          <div class="table-cell"
                              :style="{ cursor: 'pointer', backgroundColor: item.checkBackId > 0 ? '#FCE7E9' : '#D9D9D9' }"
                              @click="clickCheckBack(item)">
                              {{ item.checkBackId > 0 ? 'NG' : '-' }}
                          </div>

                      </div>

                  </div>
              </el-scrollbar>
          </div>

      </div>
      <div class="bottom generalBorder flex-row"></div>


      <div v-if="components" class="modal-overlay" @mousedown.self="closeComponent">

          <div class="modal" @click.stop>
              <button class="modal-close-btn" @click="closeComponent">
                  &times;
              </button>

              <div class="modalWindowTop">
                  <button class="modal-close-btn" @click="closeComponent">
                      &times;
                  </button>
              </div>

              <div class="modalContent">
                  <component :is="components.component" :data="components.data" @updateGroupedData="updateGroupedData"
                      @close="closeComponent" />
              </div>
          </div>
      </div>


      <div v-if="isOrdersearch" class="modal-overlay" @mousedown.self="isOrdersearchClose">
          <div class="modal">
              <div class="modalWindowTop">
                  <div class=" generalBorder flex-row">
                      <div class="flex-row">
                          <div class="search-box " style="padding-left: 20px;">
                              <input type="text" class="search-input" v-model="epcoCode" placeholder="入力番号"
                                  @keydown.enter="ordersearchClick" />
                              <span class="search-icon" @click="ordersearchClick"></span>
                          </div>
                          <button class="modal-close-btn" @click="isOrdersearchClose">
                              &times;
                          </button>
                      </div>
                  </div>
              </div>

              <div class="modalContent">

                  <table class="scrollable-table">
                      <thead>
                          <tr>
                              <th style="width: 30px;">No</th>
                              <th style="width: 50px;">状况</th>
                              <th style="width: 70px;">厂家名称</th>
                              <th style="width: 250px;">種類</th>
                              <th style="width: 110px;">受理编号</th>
                              <th style="width: 50px;">作图者</th>
                              <th style="width: 50px;">检图者</th>
                              <th style="width: 70px;">图纸ID</th>
                          </tr>
                      </thead>
                      <tbody v-loading="isLoading" element-loading-text="Loading..."
                          element-loading-spinner="el-icon-loading">
                          <tr v-if="!isLoading && ordersArry.length === 0">
                              <td colspan="8" style="border: none; text-align: center; padding: 20px;">

                                  {{ epcoCode.value !== '' ? 'No Data...' : '请输入番号' }}
                              </td>
                          </tr>
                          <tr v-else v-for="order in ordersArry" :key="order.id" @click="orderTableClick(order.id)">
                              <td>{{ order.no }}</td>
                              <td class="ellipsis-cell" :title="order.operation">{{ order.operation }}</td>
                              <td class="ellipsis-cell" :title="order.makerCode">{{ order.makerCode }}</td>
                              <td class="ellipsis-cell" :title="order.orderType">{{ order.orderType }}</td>
                              <td class="ellipsis-cell" :title="order.epcoCode">{{ order.epcoCode }}</td>
                              <td class="ellipsis-cell" :title="order.name">{{ order.name }}</td>
                              <td class="ellipsis-cell" :title="order.inspecterName">{{ order.inspecterName }}</td>
                              <td class="ellipsis-cell" :title="order.id">{{ order.id }}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

          </div>
      </div>








  </div>
</template>

<script setup>

import http from '@/api/http.js'
import extend from '@/extension/CheckItem/FileCheck.js';
import CheckBack from './CheckBack.vue';
import { ref, onMounted, reactive, nextTick, } from 'vue';
import { useRoute } from 'vue-router';


const componentsName = {
  CheckBack,
};
const components = ref(null);
const route = useRoute();
const employeeID = ref(null);
const userEmployeeID = ref(null);
const orderId = ref(null);
const OrderType = ref(null);
const epcoCode = ref(null);
const userName = ref(null);
const categoryName = ref(null);
let tblOrderTypeCategoryID = ref(-1)
let ordersArry = reactive([]);
let inChargeArryNames = ref([]);
let inChargeArryIDint = ref([]);
let inChargeArryIDstr = ref([]);

let isOrdersearch = ref(false)
let isInChargeCharge = ref(null);
let isMenuHidden = ref(true);
let isShiftCheckingContent = ref(true);
let isInspecterDialog = ref(false)
const isViewAllActive = ref(false);
const isCheckBackNG = ref(false);

const scrollableDiv = ref(null);
const eyeOpenImage = require('@/assets/imgs/FileCheck/viewAllTrue.png');
const eyeCloseImage = require('@/assets/imgs/FileCheck/viewAllFalse.png');
const showSubImage = require('@/assets/imgs/FileCheck/showSub.png');
const closeSubImage = require('@/assets/imgs/FileCheck/closeSub.png');

const shiftJPImage = require('@/assets/imgs/FileCheck/shiftJP.png');
const shiftZHImage = require('@/assets/imgs/FileCheck/shiftZH.png');

const checkbackItem = ref(null);

let selectedMenukey = ref(null);
let selectedItems = ref([]);
let groupedData = reactive({});
let groupedDataDisplay = reactive({});
let saveGroupedData = reactive({});
let menuArry = ref([])

let isDutyEditable = ref(false);
let duty = ref(-1);
let paperStatus = ref(-1);
let fileCheckHistory = reactive({
  ID: -1,
  orderId: -1,
  employeeID: '',
  duty: -1,
  paperStatus: -1,
  updateTime: new Date().toLocaleString(),
  paperWork: ''
});



onMounted(async () => {

  userName.value = route.query.userName || null;
  orderId.value = route.query.orderId || null;
  await extend.getUserEmployeeID(resolveUserEmployeeID);

});

const resolveUserEmployeeID = async (result) => {

  if (result.status === true) {
      userEmployeeID.value = result.data;
      if (orderId.value != '') {
          //获取Order表里关于当前图的信息 
          await extend.getOrder(userEmployeeID.value, orderId.value, resolveOrderSearch);

      }

  } else {
      console.log('No Result resolveUserEmployeeID');
  }
};

const resolveOrderSearch = async (result) => {

  if (result.status === true) {

      OrderType.value = result.data[0].orderType;
      epcoCode.value = result.data[0].epcoCode;
      orderId.value = result.data[0].id;
      inChargeArryIDstr.value.push(result.data[0].employeeID, result.data[0].inspecterID, result.data[0].secondInspecterID, result.data[0].JapanId)
      inChargeArryIDint.value = inChargeArryIDstr.value
      for (let i = 0; i < inChargeArryIDint.value.length; i++) {
          if (inChargeArryIDint.value[i] == '' || inChargeArryIDint.value[i] == undefined) {
              inChargeArryIDint.value[i] = '88888888'

          }
      }


      duty.value = -1;
      if (Number(userEmployeeID.value) === Number(result.data[0].employeeID)) {
          duty.value = 0;
      } else {
          duty.value = 1;
      }



      categoryName.value = "[" + result.data[0].categoryName + "]";
      if (result.data[0].employeeName != null) {
          inChargeArryNames.value.push({ "作图": result.data[0].employeeName })
      }
      if (result.data[0].inspecterName != null) {
          inChargeArryNames.value.push({ "一检": result.data[0].inspecterName })
      }
      if (result.data[0].secondInspecterName != null) {
          inChargeArryNames.value.push({ "二检": result.data[0].secondInspecterName })
      }
      if (result.data[0].JapanName != null) {
          inChargeArryNames.value.push({ "日本": result.data[0].JapanName })
      }

      tblOrderTypeCategoryID.value = result.data[0].tblOrderTypeCategoryID
      await extend.getGetFileCheckHistorys(orderId.value, resolveFileCheckHistorys)


  } else {
      console.log('No Result resolveOrderSearch');
  }
};

const resolveFileCheckHistorys = async (result) => {


  if (result.status === true) {

      isDutyEditable.value = false;
      //库里没有数据&&当前是作图,新建
      if (result.data.length === 0 && duty.value === 0) {
          await extend.getViewFileChecks(tblOrderTypeCategoryID.value, orderId.value, userEmployeeID.value, resolveGetViewFileChecks);
          isDutyEditable.value = true;

      }
      else {

          if (result.data.length > 0) {
              //判断状态，是否可编辑。
              fileCheckHistory = result.data[0];


              paperStatus.value = result.data[0].paperStatus


              if (paperStatus.value === 0 && duty.value === fileCheckHistory.duty && Number(fileCheckHistory.employeeID) === Number(userEmployeeID.value)) {
                  isDutyEditable.value = true;

              }
              //加载paper
              const parsedData = JSON.parse(result.data[0].paperWork);
              //TODO如果paper为空需要重新获取
              Object.assign(groupedData, parsedData);
              Object.assign(saveGroupedData, groupedData);
              initiateMenuArry(groupedData);
              synchronizeCheckboxStatus();
              await nextTick(() => {
                  selectedMenukey.value = Object.keys(groupedData)[0];

              });
              await nextTick(() => {
                  selectedItems.value = groupedData[selectedMenukey.value];
              });

              paperStatus.value = -1;
              //0：作业中 1：完成作业 2待定。最后的检图人始终是0，始终可编辑
              if (result.data.paperStatus) {
                  switch (result.data.paperStatus) {
                      case 0:
                          paperStatus.value = 0;
                          break;
                      case 1:
                          paperStatus.value = 1;
                          break;
                      case 2:
                          paperStatus.value = 2;
                          break;
                  }
              }
          }
      }

      //优先展示作业人
      let index = -1;
      for (let i = 0; i < inChargeArryIDint.value.length; i++) {
          if (inChargeArryIDint.value[i] !== '' && inChargeArryIDint.value[i] !== undefined) {
              if (Number(inChargeArryIDint.value[i]) === Number(userEmployeeID.value)) {
                  index = i;
                  break;
              }
          }


      }


      //对非作业人，展示当前记录fileCheckHistory.employeeID
      if (index == -1) {
          for (let i = 0; i < inChargeArryIDint.value.length; i++) {
              if (inChargeArryIDint.value[i] !== '' && inChargeArryIDint.value[i] !== undefined) {
                  if (Number(inChargeArryIDint.value[i]) === Number(fileCheckHistory.employeeID)) {
                      index = i;
                      break;
                  }
              }


          }

      }
      console.log(index);

      inChargeClick(index);
  } else {
      console.log('No Result resolveFileCheckHistorys');
  }
}

const resolveFileCheckHistory = async (result) => {
  if (result.status === true) {
      fileCheckHistory.ID = await result.data



  } else {
      console.log('No Result resolveFileCheckHistory');

  }
}


const resolveGetViewFileChecks = async (result) => {


  if (result.status === true) {
      if (result.data !== 0) {
          inChargeClick(0);
          /*             let groupedDataTemp = reactive({});
          
                      Object.assign(groupedDataTemp, result.data); */
          /* console.log(groupedDataTemp);
                      
                      let no = 1;
                      await groupedDataTemp.forEach((item) => {
                          const { name } = item;
                          item.no = no++;
                          groupedDataTemp[name].push(item);
                      }); */



          /*             Object.assign(groupedData, result.data);
          
                      Object.assign(saveGroupedData, groupedData);
                      initiateMenuArry(groupedData);
                      selectedMenukey.value = Object.keys(groupedData)[0];
                      selectedItems.value = groupedData[selectedMenukey.value];
          
                      fileCheckHistory.paperWork = JSON.stringify(saveGroupedData)
                      fileCheckHistory.orderId = orderId.value
                      fileCheckHistory.employeeID = userEmployeeID.value
                      fileCheckHistory.paperStatus = 0
                      fileCheckHistory.updateTime = new Date().toLocaleString()
                      fileCheckHistory.duty = 0;
                      await extend.createFileCheckHistorys(fileCheckHistory, resolveFileCheckHistory) */



      }


  } else {

      console.log('No Result resolveViewFileChecks');
  }


};

const updateFileCheckHistory = async (dataToSave) => {


  if (!Object.keys(dataToSave).length) {
      alert("groupedData cannot be null");
  }
  fileCheckHistory.paperWork = JSON.stringify(dataToSave);
  fileCheckHistory.updateTime = new Date().toLocaleString();

  await extend.updateFileCheckHistory(fileCheckHistory, resolveupdateFileCheckHistory)
}

const resolveupdateFileCheckHistory = (result) => {
  if (result.status === true) {
      //todo 友好提示，保存成功
  } else {
      console.log('No Result resolveupdateFileCheckHistory');

  }
}


const menuNameClick = (name) => {
  selectedMenukey.value = name;
  selectedItems.value = groupedData[name];

  const wrapElement = scrollableDiv.value.$el.querySelector('.el-scrollbar__wrap')
  if (wrapElement) {
      wrapElement.scrollTop = 0
  }
};


const selectItem = (checkingID) => {
  selectedMenukey.value = checkingID;
};


const getVueData = (name) => {
  return {
      title: isShiftCheckingContent ? checkbackItem.value.checkingContentCN : checkbackItem.value.checkingContentJP,
      orderId: orderId.value,
      employeeID: userEmployeeID.value,
      id_CheckingItem: checkbackItem.value.id_CheckingItem,
      checkBackId: checkbackItem.value.checkBackId,
      // TODO，加入已确认
      isEditable: duty.value === 0 ? false : isDutyEditable.value,
  };
}


const openComponent = (name) => {
  components.value = {
      component: componentsName[name],
      data: getVueData(name)
  }
}

const closeComponent = () => {
  components.value = null;
};

const inChargeClick = async (index) => {
  isInChargeCharge.value = index;
  isCheckBackNG.value = false;
  if (index === -1) {
      isInChargeCharge.value = null;
  }

  if (orderId.value) {
      fileCheckHistory.orderId = orderId.value
  }
  fileCheckHistory.employeeID = inChargeArryIDint.value[index]
  fileCheckHistory.paperWork = ''
  await getFileCheckHistories(fileCheckHistory)
};


const getFileCheckHistories = async (fileCheckHistory) => {
  await extend.getFileCheckHistoriesByOrderAndEmployee(fileCheckHistory, resolveGetFileCheckHistories)
}

const resolveGetFileCheckHistories = async (result) => {

  if (result.status === true) {
      const parsedData = JSON.parse(result.data[0].paperWork);
      Object.assign(groupedData, parsedData);
      Object.assign(saveGroupedData, groupedData);
      initiateMenuArry(groupedData);
      synchronizeCheckboxStatus();
      nextTick(() => {
          selectedMenukey.value = Object.keys(groupedData)[0];

      });
      nextTick(() => {
          selectedItems.value = groupedData[selectedMenukey.value];
      });

      fileCheckHistory = result.data[0];
      paperStatus.value = result.data[0].paperStatus

      isDutyEditable.value = false;
      if (paperStatus.value === 0 && duty.value === fileCheckHistory.duty && Number(fileCheckHistory.employeeID) === Number(userEmployeeID.value)) {
          isDutyEditable.value = true;

      }

  } else {
      menuArry.value = JSON.parse(JSON.stringify([]))
      groupedData = JSON.parse(JSON.stringify({}));
      saveGroupedData = JSON.parse(JSON.stringify({}));
      Object.keys(groupedData).forEach(key => {
          delete groupedData[key];
      });
      nextTick(() => {
          selectedMenukey.value = Object.keys(groupedData)[0];

      });
      nextTick(() => {
          selectedItems.value = groupedData[selectedMenukey.value];
      });
      console.log('No Result getFileCheckHistories');

  }
}


const toggleMenu = () => {
  isMenuHidden.value = !isMenuHidden.value;
}


const shifting = () => {
  isShiftCheckingContent.value = !isShiftCheckingContent.value;
}

const checkboxClick = async (item) => {

  if (item) {
      item.isChecked = !item.isChecked
      if (!isViewAllActive.value) {
          item.isHidden = item.isChecked;
      }

      const items = saveGroupedData[selectedMenukey.value];
      for (const entity of items) {
          if (entity === item) {
              entity.isChecked = item.isChecked;

              if (!isViewAllActive.value) {
                  entity.isHidden = item.isHidden;
              }
              break;
          }
      }

      if (item.children.length > 0) {
          const items = saveGroupedData[selectedMenukey.value];
          for (const entity of items) {
              item.children.forEach((child) => {
                  if (entity.checkingItemID === child) {
                      entity.isChecked = item.isChecked;

                      if (!isViewAllActive.value) {
                          entity.isHidden = item.isHidden;
                      }

                  }
              })

          }
      }


      if (item.children.length === 0) {
          const items = saveGroupedData[selectedMenukey.value];
          let childrens = ref([]);
          let father;
          for (const entity of items) {
              if (entity.father == item.father && entity.children.length > 0) {
                  childrens.value = entity.children;
                  father = entity;
              }
          }
          if (item.isChecked === false) {
              for (const entity of items) {
                  if (entity.father == item.father && entity.children.length > 0) {
                      entity.isChecked = false;
                      if (!isViewAllActive.value) {
                          entity.isHidden = false;
                      }
                  }
              }
          }
          if (item.isChecked === true) {
              let count = ref(0);
              for (const entity of items) {
                  for (let index = 1; index < childrens.value.length; index++) {
                      const element = childrens.value[index];
                      if (entity.isChecked === true && entity.checkingItemID === element) {
                          count.value = count.value + 1
                          if (count.value === childrens.value.length - 1) {
                              for (const entity of items) {
                                  if (entity === father) {
                                      father.isChecked = true
                                      entity.isHidden = item.isHidden;
                                  }
                              }
                          }
                      }
                  }

              }
          }
      }

      await updateFileCheckHistory(saveGroupedData);
  }


};

const synchronizeCheckboxStatus = () => {

  Object.keys(groupedDataDisplay).forEach(key => { delete groupedDataDisplay[key]; });
  Object.assign(groupedDataDisplay, groupedData);

  if (isViewAllActive.value) {
      Object.keys(groupedData).forEach(group => {
          groupedData[group].forEach(item => {
              item.isHidden = false;
          });
      });
  }
  else {


      Object.keys(groupedData).forEach(group => {
          groupedData[group].forEach(item => {
              if (item.isChecked) {
                  item.isHidden = true;
              }
          });
      });
  }
  Object.assign(groupedData, groupedDataDisplay);
}
const toggleViewCheckbox = () => {
  /*     Object.keys(groupedData).forEach(group => {
              groupedData[group].forEach(item => {
                  item.isShowSub = true;
              });
          });
      console.log(groupedData);
       */
  isViewAllActive.value = !isViewAllActive.value;
  synchronizeCheckboxStatus();

};

const clickCheckBack = (item) => {

  checkbackItem.value = item;
  openComponent('CheckBack');
}


const InspecterDialogClick = async (action) => {
  if (action) {
      const userConfirmed = confirm('交图确定？');
      if (userConfirmed) {
          await handOverFileCheckHistory(groupedData, action);
          isInspecterDialog.value = false;
      }

  } else {
      const userConfirmed = confirm('返图确定？');
      if (userConfirmed) {
          await handOverFileCheckHistory(groupedData, action);
          isInspecterDialog.value = false;
      }
  }
};

const inspecterDialogClose = () => {
  isInspecterDialog.value = false;
};

const isOrdersearchClose = () => {
  isOrdersearch.value = false;
};

const handOverClick = async () => {
  if (duty.value === 0) {
      const userConfirmed = confirm('交图确定？');
      if (userConfirmed) {
          await handOverFileCheckHistory(groupedData, true);
      }
  }
  else {

      isInspecterDialog.value = true

  }

}

const handOverFileCheckHistory = async (groupedData, action) => {
  //todo，检查都OK。没有NG项目
  let tmp
  fileCheckHistory.paperWork = JSON.stringify(groupedData);
  fileCheckHistory.updateTime = new Date().toLocaleString();
  fileCheckHistory.paperStatus = 1;

  let index = -1;
  for (let i = 0; i < inChargeArryIDint.value.length; i++) {
      if (inChargeArryIDint.value[i] !== '' && inChargeArryIDint.value[i] !== undefined) {
          if (Number(inChargeArryIDint.value[i]) === Number(userEmployeeID.value)) {
              index = i;
              break;
          }
      }
  }
  //返图
  if (!action) {

      //自己先保存
      fileCheckHistory.paperStatus = 1
      await extend.updateFileCheckHistory(fileCheckHistory, resolveupdateFileCheckHistory)

      //back给down级
      tmp = saveGroupedData;
      resetGroupedBoolData(tmp);
      fileCheckHistory.paperWork = JSON.stringify(tmp);
      fileCheckHistory.updateTime = new Date(new Date().setSeconds(new Date().getSeconds() + 1)).toLocaleString();;

      switch (index) {
          case 0:

              break;
          case 1:
              fileCheckHistory.duty = 0;
              fileCheckHistory.paperStatus = 0;
              fileCheckHistory.employeeID = inChargeArryIDstr.value[Number(index) - 1]
              await extend.createFileCheckHistorys(fileCheckHistory, resolveFileCheckHistory)

              break;
          case 2:
              fileCheckHistory.duty = 1;
              fileCheckHistory.paperStatus = 0;
              fileCheckHistory.employeeID = inChargeArryIDstr.value[Number(index) - 1]
              await extend.createFileCheckHistorys(fileCheckHistory, resolveFileCheckHistory)

              break;
          default:
              console.log('返图错误： ' + index);
              break;
      }
  }

  //交图
  if (action) {
      let nextInspector
      switch (index) {
          case 0:

              //自己先保存
              fileCheckHistory.paperStatus = 1
              await extend.updateFileCheckHistory(fileCheckHistory, resolveupdateFileCheckHistory)

              //forword给 up 级
              tmp = saveGroupedData;
              resetGroupedBoolData(tmp);
              fileCheckHistory.paperWork = JSON.stringify(tmp);
              fileCheckHistory.updateTime = new Date(new Date().setSeconds(new Date().getSeconds() + 1)).toLocaleString();;

              fileCheckHistory.paperStatus = 0;
              fileCheckHistory.employeeID = inChargeArryIDstr.value[Number(index) + 1]
              fileCheckHistory.duty = 1;
              await extend.createFileCheckHistorys(fileCheckHistory, resolveFileCheckHistory)

              break;
          case 1:
              //保存自己前，判断是否还有而检，
              //todo，有未确定的ng项目，提示
              nextInspector = inChargeArryIDint.value[Number(index) + 1]

              if (nextInspector === '88888888') {

              } else {
                  //先保存自己
                  fileCheckHistory.paperStatus = 1
                  await extend.updateFileCheckHistory(fileCheckHistory, resolveupdateFileCheckHistory)

                  //forword给 up 级
                  tmp = saveGroupedData;
                  resetGroupedBoolData(tmp);
                  fileCheckHistory.paperWork = JSON.stringify(tmp);
                  fileCheckHistory.updateTime = new Date(new Date().setSeconds(new Date().getSeconds() + 1)).toLocaleString();;

                  fileCheckHistory.paperStatus = 0;
                  fileCheckHistory.employeeID = inChargeArryIDstr.value[Number(index) + 1]
                  fileCheckHistory.duty = 1;
                  await extend.createFileCheckHistorys(fileCheckHistory, resolveFileCheckHistory)
              }

              break;
          case 2:
              //二检暂时没有上一级。
              //todo，有未确定的ng项目，提示
              if (nextInspector === '88888888') {

              } else {
                  //先保存自己


                  //forword给 up 级

              }
              break;
          default:
              console.log('返图错误： ' + index);
              break;
      }
      fileCheckHistory.paperStatus = 1
  }

  //todo 有问题，作图交完跳转到检图了。
  isDutyEditable.value = false;


  alert('提交成功')
  inChargeClick(index)

  //window.location.reload();
}

const resetGroupedBoolData = (groupedData) => {
  //todo,根据需求选择重置项目
  Object.keys(groupedData).forEach(key => {
      groupedData[key].forEach(item => {
          if (item.hasOwnProperty('isChecked')) {
              item.isChecked = false;
          }
          if (item.hasOwnProperty('isHidden')) {
              item.isChecked = false;
          }
      });
  });
}


const updateGroupedData = async (id_CheckingItem, checkBackId, done) => {

  Object.keys(groupedData).forEach(key => {
      const items = groupedData[key];
      items.forEach(item => {

          if (item.id_CheckingItem === id_CheckingItem) {
              item.checkBackId = checkBackId;
          }
      });
  });
  if (done) done();

  const items = saveGroupedData[selectedMenukey.value];
  for (const itemsaveGroupedData of items) {
      if (itemsaveGroupedData.id_CheckingItem === id_CheckingItem) {
          itemsaveGroupedData.checkBackId = checkBackId
          break;
      }
  }
  await updateFileCheckHistory(saveGroupedData);
}

let isLoading = ref(false)
const ordersearchClick = async () => {
  ordersArry.length = 0;
  isLoading.value = true;
  isOrdersearch.value = true;



  if (epcoCode.value != '' && epcoCode.value != null) {
      extend.getOrderInfos(epcoCode.value, resolveOrderInfos);
  }
  else {
      isLoading.value = false
  }


};

const resolveOrderInfos = async (result) => {


  if (result.status === true) {
      Object.assign(ordersArry, result.data);

  } else {
      console.log('No Result resolveOrderInfos');
  }
  isLoading.value = false;
};


const orderTableClick = async (orderTableOrderId) => {
  //todo查询后显示有问题
  inChargeArryNames.value.length = 0;
  inChargeArryIDint.value.length = 0;
  orderId.value = orderTableOrderId
  await extend.getOrder(userEmployeeID.value, orderTableOrderId, resolveOrderSearch);
}


const openSettingLink = () => {
  let url = `http://192.168.222.3/#/login?userName=${userName.value}&password=b01E37&redirect=MakeTreeTable`;
  if (process.env.NODE_ENV == 'development') {
      url = `http://localhost:9990/#/login?userName=${userName.value}&password=b01E37&redirect=MakeTreeTable`;
  }
  window.open(url, '_blank');
}


const isNGViewActive = ref(false);
const toggleNGView = () => {
  isNGViewActive.value = !isNGViewActive.value;
  changeToNGGroup();
  synchronizeCheckboxStatus();
};
const changeToNGGroup = async () => {
  if (isNGViewActive.value) {

      let groupedDataTemp = JSON.parse(JSON.stringify(groupedData));
      Object.keys(groupedDataTemp).forEach(key => {
          const items = groupedDataTemp[key];
          for (let i = items.length - 1; i >= 0; i--) {
              if (items[i].hasOwnProperty('checkBackId') && items[i].checkBackId === -1) {
                  items.splice(i, 1);
              }
          }
      });
      Object.assign(groupedData, groupedDataTemp);
  } else {

      Object.assign(groupedData, saveGroupedData);
  }
  //initiateMenuArry(groupedData);
  await nextTick(() => {
      selectedMenukey.value = Object.keys(groupedData)[0];
  });
  await nextTick(() => {
      selectedItems.value = groupedData[selectedMenukey.value];
  });
};

const initiateMenuArry = (groupedData) => {
  menuArry.value = [];
  let groupedDataMenu = JSON.parse(JSON.stringify(groupedData));

  Object.keys(groupedDataMenu).forEach(group => {
      menuArry.value.push({
          'name': group,
          'enable': groupedDataMenu[group][0].enableDifferentiation,
      })
  });

}

const showSubClick = (item) => {
  Object.keys(groupedDataDisplay).forEach(key => { delete groupedDataDisplay[key]; });
  Object.assign(groupedDataDisplay, groupedData);
  item.children.forEach((child) => {
      Object.keys(groupedDataDisplay).forEach(group => {
          groupedDataDisplay[group].forEach(entity => {
              if (child === entity.checkingItemID) {
                  entity.isShowSub = !entity.isShowSub;
              }
          });
      });



  });

  console.log(groupedData);
  (groupedData)
  Object.assign(groupedData, groupedDataDisplay);

  if (isDutyEditable.value) {

      updateFileCheckHistory(saveGroupedData);
  }

};





function resetGroupedNGData(data) {

}

const checkBackstatuts = (checkBackId) => {

}

const toggleViewAll1 = () => {

}


</script>








<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 13px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  white-space: nowrap;
}

thead {
  background-color: #007ACC;
  color: #fff;
}

tbody tr:hover {
  background-color: #f2f2f2;
}


.scrollable-table {
  width: 700px;
  height: 400px;
  overflow-y: scroll;
  display: block;
}


.scrollable-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
}


.ellipsis-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}


.ellipsis-cell:hover {
  cursor: pointer;
  background-color: #f2f2f2;
}







* {
  box-sizing: border-box;
}

input[type="text"]:focus {
  background-color: #e0f7fa;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 0px solid #ccc;
  border-radius: 15px;
  overflow: hidden;
}

.generalBorder {
  border: 0px solid #ccc;
}

.flex-row {
  display: flex;
  flex-direction: row;

}

.flex-column {
  display: flex;
  flex-direction: column;
}

.search {
  height: 40px;
  background-color: #AEC3EF;
}

.personInCharge {
  flex: 5;
  background-color: #F0F3F9;
  padding-left: 3px;
}

.content {
  flex: 50;
  overflow: hidden;
  border: 0px solid blue;
}

.bottom {
  flex: 0 0 35px;
  background-color: #DBE3F4;
}

.box {
  border: 0px solid #666;
  text-align: center;

}

.box-1 {
  background-image: url("~@/assets/imgs/FileCheck/fistIcon.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;

}

.imageStyle {
  margin-right: 1px;
}

.viewAll {
  background-image: url("~@/assets/imgs/FileCheck/viewAllTrue.png");
}

.shift {
  background-image: url("~@/assets/imgs/FileCheck/shiftZH.png");
}

/* 显示NG */
.errorFeedBack {
  background-image: url("~@/assets/imgs/FileCheck/errorFeedBack.png");
}

.exportExcel {
  background-image: url("~@/assets/imgs/FileCheck/exportExcel.png");
}

.setting {
  background-image: url("~@/assets/imgs/FileCheck/setting.png");
}

.handOver {
  background-image: url("~@/assets/imgs/FileCheck/handOver.png");
}

.showSub {
  background-image: url("~@/assets/imgs/FileCheck/showSub.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 35px;
  height: 17px;
  cursor: pointer;

}

.parentDiv {
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0px solid red;
  height: 100%;

}



.viewAll,
.shift,
.errorFeedBack,
.exportExcel,
.setting,
.handOver {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 70px;
  height: 70px;
  cursor: pointer;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;

}

.search-input {
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 7px;
  padding-left: 10px;
  width: 150px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid #DBE3F4;
}

.search-icon {
  position: absolute;
  right: 3.5%;
  top: 50%;
  transform: translateY(-50%);
  background-image: url("~@/assets/imgs/FileCheck/search.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 22px;
  height: 24px;
  cursor: pointer;
}

.OrderType-div {
  display: flex;
  align-items: center;
  border: 0px solid #f70909;
  padding-left: 10px;
  padding-bottom: 4px;
}

button {
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  position: relative;
  background: #fff;

  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10000;
}

.modal-close-btn {
  position: absolute;
  top: 5px;
  right: 13px;
  background: none;
  border: none;
  font-size: 27px;
  cursor: pointer;
}

.modal-close-btn:hover {
  color: #7759D5;
}

.inChargeBordered-div {
  margin-top: 7px;
  width: 80px;
  height: 70px;

}

.inChargeInner-div {
  border: 1px solid #ccc;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #E8F2FE;
  cursor: pointer;

}

.inChargeInner-div.selected {
  background-color: #396DF6;
}

.key,
.value {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.separator {
  width: 100%;
  border-top: 1px solid #ccc;

}

.activeMenu {
  background-color: #91AADF;

}

.menuSelectedDisable {
  background-color: #91AADF;
}

.stretch {
  background-image: url("~@/assets/imgs/FileCheck/stretch.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 40px;
  height: 35px;
  margin-left: auto;
  cursor: pointer;
  border: 0px solid #f70909;
}

.menu {
  display: flex;
  background-color: #DBE3F4;
  min-width: 120px;
  min-height: 380px;
  flex-direction: column;
}

.hidden {
  width: 40px;
  min-height: 380px;
  background-color: #DBE3F4;
}

.checkingContent {
  overflow: hidden;
  padding: 0px;
  display: flex;
  flex-direction: column;
  border: 0px solid pink;
  width: 100%;

}

.scrollabl-div {
  width: 100%;
  border: 0px solid #f70909;
  padding: 10px 5px 0px 5px;

}

.table-header {
  display: flex;
  height: 47px;
  align-items: center;
  font-weight: bold;
  font-size: 0.85vw;
  border: 0px solid #f70909;
  border-bottom: 3px solid #ccc;
  margin: 0px 5px 0px 5px;

}

.table-row {
  font-size: 14px;
  display: flex;
  border-bottom: 1px solid #ccc;
  /* background-color: #DBE3F4; */
  margin: 0px 0px 15px 0px;
  border: 0px solid #f70909;
}


.table-cell {
  text-align: center;
  padding: 7px;
  border-right: 2px solid #91AADF;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.table-header .table-cell:nth-child(1),
.table-row .table-cell:nth-child(1) {
  flex: 0.5;
  justify-content: center;
}

.table-header .table-cell:nth-child(2),
.table-row .table-cell:nth-child(2) {
  flex: 10;
  justify-content: flex-start;
}

.table-row .table-cell:nth-child(2) {
  text-align: left;
  justify-content: flex-start !important;
}

.table-header .table-cell:nth-child(2) {

  justify-content: center;
}

.table-header .table-cell:nth-child(3),
.table-row .table-cell:nth-child(3) {
  flex: 1;
}

.table-header .table-cell:nth-child(4),
.table-row .table-cell:nth-child(4) {
  flex: 3;
}

.table-header .table-cell:nth-child(5),
.table-row .table-cell:nth-child(5) {
  flex: 1;
}

.table-header .table-cell:nth-child(6),
.table-row .table-cell:nth-child(6) {
  flex: 1;
}

.table-cell:last-child {
  border-right: none;
}

:deep(.el-scrollbar__bar) {
  width: 9px;
  background-color: rgba(24, 24, 24, 0.2);
}

:deep(.el-scrollbar__thumb) {
  background-color: #FF0000;
  border: 5px solid #0000FF;
}

.checkbox-container {
  border: 0px solid #f70909;
  display: flex;
  align-items: center;
  justify-content: center;
}


.modal-option {
  padding: 10px 0;
  margin: 10px 0;
  cursor: pointer;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #91AADF;
  transition: background-color 0.3s, border 0.3s;
}

.modal-option:hover {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}

@keyframes fadeIn {
  from {
      opacity: 0;
  }

  to {
      opacity: 1;
  }
}

@keyframes slideIn {
  from {
      transform: translateY(-20px);
      opacity: 0;
  }

  to {
      transform: translateY(0);
      opacity: 1;
  }
}

.text-red {
  color: red;
}

.text-black {
  color: black;
}

.menuDisableColor {
  background-color: #D9D9D9;
}

.modalWindowTop {
  background-color: #82A5E7;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}

.modalContent {
  padding: 0px 20px 20px 20px;
}

.checkContent {
  display: flex;
  flex-direction: row;
}
</style>