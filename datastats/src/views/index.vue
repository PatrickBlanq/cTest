<template>
    <div class="fullscreen-div ">
        <div class="left">
            <div class="top">
                <div class="left1 flex-column">
                    <div class="t-l-column1 flex-row">
                        <Title strTitle="纳期状况"></Title>
                        <DateSelect></DateSelect>
                    </div>
                    <div class="t-l-column2 flex-row">
                        <Arc :data="dataArc1"></Arc>
                        <Arc :data="dataArc2"></Arc>
                        <Arc :data="dataArc3"></Arc>
                        <Arc :data="dataArc4"></Arc>
                    </div>
                    <div class="t-l-column3">
                        <div class="column-flex-row">
                            <NumCard :data="dataCard1" />
                            <NumCard :data="dataCard2" />
                            <NumCard :data="dataCard3" />
                            <NumCard :data="dataCard4" />
                            <NumCard :data="dataCard5" />
                            <NumCard :data="dataCard5" />
                            <NumCard :data="dataCard5" />
                            <NumCard :data="dataCard6" />
                        </div>

                    </div>
                    <div class="t-l-column4">
                        <Collapse :menu="menu" />
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="left2">
                    <Title strTitle="在库种类状况"></Title>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="top flex-column">
                <div class="center1">EPCOデータ掲示板</div>
                <div class="center2 flex-row">
                    <div class="t-c-2"></div>
                    <div class="t-c-2"></div>
                    <div class="t-c-2"></div>
                </div>
                <div class="center3"></div>
            </div>
            <div class="bottom">
            </div>
        </div>
        <div class="right">
            <div class="top flex-column">
                <div class="right1">
                    <DateTimeDisplay />
                </div>
                <div class="right2">
                    <Title strTitle="出勤人数"></Title>
                </div>
                <div class="right3">
                    <Title strTitle="是正情况"></Title>
                </div>
            </div>
            <div class="bottom">
                <div class="">
                    <Title strTitle="纳期动态"></Title>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import Title from '@/components/Title.vue';
import DateSelect from '@/components/DateSelect.vue';
import Arc from '@/components/Arc.vue';
import DateTimeDisplay from '@/components/DateTimeDisplay.vue';
import NumCard from '@/components/NumCard.vue';
import Collapse from '@/components/Collapse.vue';

/* const menu = reactive([
    { id: 1, group1: "沖縄第2設計センター", group2: "沖縄第1G", group3: "第1・2T", name: "橋本総業（アイフル・一般）、東京セキスイ、渡辺パイプ", selected: false, color: "#488EF7", width: "60%" },
    { id: 2, group1: "g1", group2: "g1-g1", group3: "g321", name: "大和ハウス総合窓口　変更（住宅・給排水）", selected: false, color: "#F2B564", width: "40%" },
    { id: 3, group1: "g2", group2: "g1", group3: "g312", name: "g2g1n1", selected: false, color: "#F2B564", width: "40%" },
    { id: 4, group1: "g2", group2: "g2", group3: "g322", name: "g2g2n2", selected: false, color: "#F2B564", width: "40%" },
    { id: 5, group1: "g2", group2: "g2", group3: "g322", name: "gh2g2n2", selected: false, color: "#F2B564", width: "40%" }
]); */
const menu = reactive(
    [
        {
            "ID": 1,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第1G",
            "Group3": "第1・2T",
            "Name": "住友林業（住宅事業本部）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "新フロー最終納品日",
            "Condition2": "管理表編集住友林業_view left outer join T_住林CADセンターマスタ on 管理表編集住友林業_view.CADセンター識別子= T_住林CADセンターマスタ.識別子",
            "Condition3": "",
            "UnitPrice": 37.00,
            "SortOrder": 1
        },
        {
            "ID": 2,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第1G",
            "Group3": "第1・2T",
            "Name": "住友林業（経路図）",
            "Description": null,
            "IsPartOfQuantityTotal": 0,
            "IsPartOfAmountTotal": 1,
            "Condition1": "経路チェック納品日",
            "Condition2": "管理表編集住友林業_view left outer join T_住林CADセンターマスタ on 管理表編集住友林業_view.CADセンター識別子= T_住林CADセンターマスタ.識別子",
            "Condition3": "",
            "UnitPrice": 2.00,
            "SortOrder": 2
        },
        {
            "ID": 3,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第1G",
            "Group3": "第1・2T",
            "Name": "住友林業（まちづくり事業部）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品日2",
            "Condition2": "管理表編集住林まちづくり_view",
            "Condition3": "",
            "UnitPrice": 31.00,
            "SortOrder": 3
        },
        {
            "ID": 4,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第1G",
            "Group3": "第1・2T",
            "Name": "住友林業フォレストメゾン",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "新フロー最終納品日",
            "Condition2": "管理表編集住林2x4_view left outer join T_住林CADセンターマスタ on 管理表編集住林2x4_view.CADセンター識別子= T_住林CADセンターマスタ.識別子",
            "Condition3": "物件種別 in (0,1) and 物件仕様 = 3",
            "UnitPrice": 40.00,
            "SortOrder": 4
        },
        {
            "ID": 5,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第1G",
            "Group3": "第1・2T",
            "Name": "住友林業フォレストメゾン（仮図）",
            "Description": null,
            "IsPartOfQuantityTotal": 0,
            "IsPartOfAmountTotal": 1,
            "Condition1": "仮図納品日",
            "Condition2": "管理表編集住林2x4_view left outer join T_住林CADセンターマスタ on 管理表編集住林2x4_view.CADセンター識別子= T_住林CADセンターマスタ.識別子",
            "Condition3": "物件種別 in (0,1) and 物件仕様 = 3",
            "UnitPrice": 2.00,
            "SortOrder": 5
        },
        {
            "ID": 6,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "サーラ住宅",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集サーラ住宅_view",
            "Condition3": null,
            "UnitPrice": 38.00,
            "SortOrder": 6
        },
        {
            "ID": 7,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "トヨタウッドユーホーム（THさいたま含む）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集トヨタウッド_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 24.00,
            "SortOrder": 7
        },
        {
            "ID": 8,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "桧家住宅",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集中小工務店_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 18.00,
            "SortOrder": 8
        },
        {
            "ID": 9,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "ＮＣＮ",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 40.00,
            "SortOrder": 9
        },
        {
            "ID": 10,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "パナソニック・リビングベル",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品日",
            "Condition2": "管理表編集パナソニック電工_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 20.00,
            "SortOrder": 10
        },
        {
            "ID": 11,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "近藤建設",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集近藤建設_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 33.00,
            "SortOrder": 11
        },
        {
            "ID": 12,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "菊池建設",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集菊池建設_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 43.00,
            "SortOrder": 12
        },
        {
            "ID": 13,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "三交不動産",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集三交不動産_view",
            "Condition3": "isnull(物件種別,0) in (0,1)",
            "UnitPrice": 34.00,
            "SortOrder": 13
        },
        {
            "ID": 14,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "日本ハウスＨＤ(簡易版）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集東日本ハウス_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 20.00,
            "SortOrder": 14
        },
        {
            "ID": 15,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "橋本総業（もりぞう）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集サンワホーム_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 23.00,
            "SortOrder": 15
        },
        {
            "ID": 16,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "橋本総業（アイフル・一般）、東京セキスイ、渡辺パイプ",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集アイフルホーム_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 9.00,
            "SortOrder": 16
        },
        {
            "ID": 17,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "MUJI HOUSE",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 27.00,
            "SortOrder": 17
        },
        {
            "ID": 18,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "イトーピアホーム（給排水）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "完了日",
            "Condition2": "管理表編集イトーピアホーム_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 15.00,
            "SortOrder": 18
        },
        {
            "ID": 19,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "トヨタホーム（三重）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集トヨタホーム_View",
            "Condition3": "物件種別 in (0,1) and (支店名 like '%ちば%' or 支店名 like '%三重%' or 支店名 like '%富士湘南%' or 支店名 like '%ふじ%')",
            "UnitPrice": 35.00,
            "SortOrder": 19
        },
        {
            "ID": 20,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "トヨタホーム（東京）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集トヨタホーム_View",
            "Condition3": "物件種別 in (0,1) and 支店名 like '%東京%'",
            "UnitPrice": 30.00,
            "SortOrder": 20
        },
        {
            "ID": 21,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "トヨタホーム（ふじ）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 30.00,
            "SortOrder": 21
        },
        {
            "ID": 22,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "トヨタホーム（北関東）（WP経由）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集トヨタホーム_View",
            "Condition3": "物件種別 in (0,1) and 支店名 like '%北関東%'",
            "UnitPrice": 25.00,
            "SortOrder": 22
        },
        {
            "ID": 23,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "セルコホーム（BP）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集セルコホーム_view",
            "Condition3": "物件種別 in (0,1)",
            "UnitPrice": 35.00,
            "SortOrder": 23
        },
        {
            "ID": 24,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "セルコホーム（直営）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 26.00,
            "SortOrder": 24
        },
        {
            "ID": 25,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "ファイブイズホーム",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集ファイブイズホーム_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 20.00,
            "SortOrder": 25
        },
        {
            "ID": 26,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "ファイブイズホーム（竣工図）",
            "Description": null,
            "IsPartOfQuantityTotal": 0,
            "IsPartOfAmountTotal": 1,
            "Condition1": "竣工図納品日",
            "Condition2": "管理表編集ファイブイズホーム_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 7.00,
            "SortOrder": 26
        },
        {
            "ID": 27,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "ヒノキヤレスコ（給排水）",
            "Description": "移管",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集ヒノキヤレスコ_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 40.00,
            "SortOrder": 27
        },
        {
            "ID": 28,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第2G",
            "Group3": "第1・2T",
            "Name": "小規模HM",
            "Description": "移管",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 21.50,
            "SortOrder": 28
        },
        {
            "ID": 29,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第1・2T",
            "Name": "パナソニックホームズ（給排水）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集パナホーム_view",
            "Condition3": "物件種別 in (0,1,3,4,5)",
            "UnitPrice": 31.50,
            "SortOrder": 29
        },
        {
            "ID": 30,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第1・2T",
            "Name": "アクアシステム（パナホーム上棟検）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 2.40,
            "SortOrder": 30
        },
        {
            "ID": 31,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第1・2T",
            "Name": "パナソニックホームズ（ガス・系統図）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "ガス納品日",
            "Condition2": "管理表編集パナホーム売上リスト用_view",
            "Condition3": "物件種別 in (0,1,3,4,5) and ガス受付日 is not null and ガス受付番号=0",
            "UnitPrice": 60.00,
            "SortOrder": 31
        },
        {
            "ID": 32,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第1・2T",
            "Name": "パナソニックホームズ（空調設備図）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "換気ダクト納品日",
            "Condition2": "管理表編集パナホーム売上リスト用_view",
            "Condition3": "物件種別 in (0,1,3,4,5) and 換気ダクト受付日 is not null and 換気ダクト受付番号=0",
            "UnitPrice": 30.00,
            "SortOrder": 32
        },
        {
            "ID": 33,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第1・2T",
            "Name": "パナソニックホームズ（基礎施工図）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品日",
            "Condition2": "管理表編集パナソニックホームズ基礎施工図売上リスト用_view",
            "Condition3": null,
            "UnitPrice": 10.00,
            "SortOrder": 33
        },
        {
            "ID": 34,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第3T",
            "Name": "三井ホーム（給排水）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "三者後納図",
            "Condition2": "管理表編集三井ホーム_view",
            "Condition3": "物件種別 in (0,1) and isnull(特殊物件,0) = 0",
            "UnitPrice": 27.00,
            "SortOrder": 34
        },
        {
            "ID": 35,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第3T",
            "Name": "三井ホーム（仮設ネット）",
            "Description": "中部追加",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "三者後納図",
            "Condition2": "管理表編集三井ホーム_view",
            "Condition3": "物件種別 in (0,1) and 請求別FLG = 1 and 仮設ネット = 1",
            "UnitPrice": 1.50,
            "SortOrder": 35
        },
        {
            "ID": 36,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第3T",
            "Name": "三井ホーム標準外",
            "Description": "移管",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "三者後納図",
            "Condition2": "管理表編集三井ホーム_view",
            "Condition3": "物件種別 in (0,1) and isnull(特殊物件,0) = 1",
            "UnitPrice": 80.00,
            "SortOrder": 36
        },
        {
            "ID": 37,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第3G",
            "Group3": "第3T",
            "Name": "サンヨーホームズ",
            "Description": "移管",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "二次納品",
            "Condition2": "管理表編集三洋ホームズ_view",
            "Condition3": "物件種別 in (0,1)",
            "UnitPrice": 38.00,
            "SortOrder": 37
        },
        {
            "ID": 38,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第4G",
            "Group3": "第1・2T",
            "Name": "パナホーム営業プレゼン（プラン入力）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "(Case when 基本納品日時 is not null then 基本納品日時 \r\n  when 基本納品日時 is null then (Case when 提案納品日時 is not null then 提案納品日時 \r\n            when 提案納品日時 is null then (Case when すまいる納品日時 is not null then すまいる納品日時 \r\n          when すまいる納品日時 is null then (Case when パース納品日時 is not null then  パース納品日時 end) end) end) end)",
            "Condition2": "管理表編集パナホームプレゼン_view",
            "Condition3": "請求金額合計 <> 0",
            "UnitPrice": 17.00,
            "SortOrder": 38
        },
        {
            "ID": 39,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第4G",
            "Group3": "第1・2T",
            "Name": "パナホーム営業プレゼン（提案書）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 22.00,
            "SortOrder": 39
        },
        {
            "ID": 40,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第4G",
            "Group3": "第3T",
            "Name": "一条工務店（雨樋）（タキロン経由）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 2.20,
            "SortOrder": 40
        },
        {
            "ID": 41,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第4G",
            "Group3": "第3T",
            "Name": "大和ハウス工業・雨樋（タキロン経由）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 4.10,
            "SortOrder": 41
        },
        {
            "ID": 42,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第4G",
            "Group3": "第3T",
            "Name": "一般工務店・雨樋（タキロン経由）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 4.10,
            "SortOrder": 42
        },
        {
            "ID": 43,
            "Year": 2024,
            "Group1": "沖縄第1設計センター",
            "Group2": "沖縄第4G",
            "Group3": "第4T",
            "Name": "カネカ（ＰＶ設計）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 43
        },
        {
            "ID": 44,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第5G",
            "Group3": "第1・2T",
            "Name": "大和ハウス総合窓口（住宅・給排水）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 11.00,
            "SortOrder": 44
        },
        {
            "ID": 45,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第5G",
            "Group3": "第1・2T",
            "Name": "大和ハウス(住宅・鉄骨）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 17.50,
            "SortOrder": 45
        },
        {
            "ID": 46,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第5G",
            "Group3": "第1・2T",
            "Name": "大和ハウス　予算数量情報　給排水（新規）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 2.00,
            "SortOrder": 46
        },
        {
            "ID": 47,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第5G",
            "Group3": "第1・2T",
            "Name": "大和ハウス（給排水区画貫通）住宅",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 25.00,
            "SortOrder": 47
        },
        {
            "ID": 48,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第5G",
            "Group3": "第1・2T",
            "Name": "大和ハウス総合窓口　変更（住宅・給排水）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 9.00,
            "SortOrder": 48
        },
        {
            "ID": 49,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第5G",
            "Group3": "第1・2T",
            "Name": "大和ハウス　変更(住宅・鉄骨）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 49
        },
        {
            "ID": 50,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第3T",
            "Name": "大和ハウス  (住宅・木造）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 17.50,
            "SortOrder": 50
        },
        {
            "ID": 51,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第3T",
            "Name": "大和ハウス  (集合）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 26.50,
            "SortOrder": 51
        },
        {
            "ID": 52,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第3T",
            "Name": "大和ハウス  (ＷＳ・給排水）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 18.00,
            "SortOrder": 52
        },
        {
            "ID": 53,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第3T",
            "Name": "大和ハウス（ALC貫通図）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 45.00,
            "SortOrder": 53
        },
        {
            "ID": 54,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第3T",
            "Name": "大和ハウス（エリア拡大）集合",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 24.00,
            "SortOrder": 54
        },
        {
            "ID": 55,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第1T",
            "Name": "タマホーム（給排水）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集タマホーム_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 17.50,
            "SortOrder": 55
        },
        {
            "ID": 56,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第2T",
            "Name": "ALL営業見積（ライフライン）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 18.00,
            "SortOrder": 56
        },
        {
            "ID": 57,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第2T",
            "Name": "イシカワ",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "給排水納品日",
            "Condition2": "管理表編集イシカワ_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 30.00,
            "SortOrder": 57
        },
        {
            "ID": 58,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第2T",
            "Name": "小田急ハウジング",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納品",
            "Condition2": "管理表編集小田急ハウジング_view",
            "Condition3": "物件種別 in (0,1) ",
            "UnitPrice": 39.50,
            "SortOrder": 58
        },
        {
            "ID": 59,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第2T",
            "Name": "一条工務店（タカノホーム）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "納図",
            "Condition2": "kanri2001.dbo.管理表編集一条工務店_view",
            "Condition3": "請求会社ID = 1140",
            "UnitPrice": 40.00,
            "SortOrder": 59
        },
        {
            "ID": 60,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第2T",
            "Name": "一建設",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 39.00,
            "SortOrder": 60
        },
        {
            "ID": 61,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第6G",
            "Group3": "第2T",
            "Name": "パナソニック電材ソリューションズ（給排水）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 20.00,
            "SortOrder": 61
        },
        {
            "ID": 62,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "アイフルホーム（電気）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "ユニット納品日",
            "Condition2": "管理表編集アイフルホーム電気_view",
            "Condition3": null,
            "UnitPrice": 31.00,
            "SortOrder": 62
        },
        {
            "ID": 63,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "イシカワ（電気）",
            "Description": "価格改定",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "プラン図_納品日",
            "Condition2": "管理表編集イシカワ電気_view",
            "Condition3": "isnull(物件種別,0) not in (1,2)",
            "UnitPrice": 30.00,
            "SortOrder": 63
        },
        {
            "ID": 64,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "イシカワ（電気）　情報作成費",
            "Description": null,
            "IsPartOfQuantityTotal": 0,
            "IsPartOfAmountTotal": 1,
            "Condition1": "発注書着日2",
            "Condition2": "管理表編集イシカワ電気_view",
            "Condition3": "isnull(物件種別,0) not in (1,2)",
            "UnitPrice": 4.00,
            "SortOrder": 64
        },
        {
            "ID": 65,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "小田急ハウジング（電気）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "確定納品日",
            "Condition2": "管理表編集小田急ハウジング電気_view",
            "Condition3": null,
            "UnitPrice": 39.50,
            "SortOrder": 65
        },
        {
            "ID": 66,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "パナソニック電材ソリューションズ（電気）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 31.00,
            "SortOrder": 66
        },
        {
            "ID": 67,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "ジューテックホーム",
            "Description": "NEW!",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 26.00,
            "SortOrder": 67
        },
        {
            "ID": 68,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "ヤマダホームズ（電気）",
            "Description": "NEW!",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 27.50,
            "SortOrder": 68
        },
        {
            "ID": 69,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第1T",
            "Name": "アイ工務店（電気）",
            "Description": "NEW!",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 69
        },
        {
            "ID": 70,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第2T",
            "Name": "タマホーム（電気）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "電気納品",
            "Condition2": "管理表編集タマホーム_view left outer join \n (SELECT [T_タマホーム依頼時必要資料].エプコ管理番号, \n   [T_タマホーム依頼時必要資料].着日 AS 電気依頼書着日 \n    FROM [T_タマホーム依頼時必要資料] \n    WHERE ([T_タマホーム依頼時必要資料].資料ID = '0009')    --'設計依頼書ID\n  ) 依頼書情報 on 管理表編集タマホーム_view.エプコ管理番号 = 依頼書情報.エプコ管理番号",
            "Condition3": null,
            "UnitPrice": 17.15,
            "SortOrder": 70
        },
        {
            "ID": 71,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第3・4T",
            "Name": "大和ハウス総合窓口（住宅・電気）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 5.50,
            "SortOrder": 71
        },
        {
            "ID": 72,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第3・4T",
            "Name": "スポット対応",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 72
        },
        {
            "ID": 73,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第3・4T",
            "Name": "大和ハウス（電気）（幹線弱電）",
            "Description": "移管",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 50.00,
            "SortOrder": 73
        },
        {
            "ID": 74,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第3・4T",
            "Name": "大和ハウス（電気区画貫通）集合",
            "Description": "移管",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 15.00,
            "SortOrder": 74
        },
        {
            "ID": 75,
            "Year": 2024,
            "Group1": "沖縄第2設計センター",
            "Group2": "沖縄第7G",
            "Group3": "第3・4T",
            "Name": "一建設（電気）（幹線弱電）",
            "Description": "NEW!",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 56.00,
            "SortOrder": 75
        },
        {
            "ID": 76,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第１・２T",
            "Name": "カネカ（ＰＶ設計）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 76
        },
        {
            "ID": 77,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第１・２T",
            "Name": "トヨタウッドユーホーム（ＰＶ設計）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 77
        },
        {
            "ID": 78,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第3T",
            "Name": "タマホーム（設備認定）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "JPEA申請日",
            "Condition2": "管理表編集タマホーム設備認定_view",
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 78
        },
        {
            "ID": 79,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第3T",
            "Name": "三井ホーム（設備認定）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "JPEA申請日",
            "Condition2": "管理表編集三井ホーム設備認定_view",
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 79
        },
        {
            "ID": 80,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第3T",
            "Name": "トヨタホーム（設備認定）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": "JPEA申請日",
            "Condition2": "管理表編集トヨタホーム設備認定_view",
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 80
        },
        {
            "ID": 81,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第3T",
            "Name": "ユニフロー（新規）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 81
        },
        {
            "ID": 82,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第3T",
            "Name": "ユニフロー（訂正）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 82
        },
        {
            "ID": 83,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第1G",
            "Group3": "第3T",
            "Name": "三井ホーム（竣工図）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 83
        },
        {
            "ID": 84,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第2G",
            "Group3": "第１・２T",
            "Name": "大和ハウス（電気区画貫通）住宅",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 84
        },
        {
            "ID": 85,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第2G",
            "Group3": "第１・２T",
            "Name": "非住宅（Skye電気）",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 85
        },
        {
            "ID": 86,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第2G",
            "Group3": "第１・２T",
            "Name": "パナソニックホームズ（電気）（幹線弱電）",
            "Description": "NEW!",
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 86
        },
        {
            "ID": 87,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第2G",
            "Group3": "第１・２T",
            "Name": "エネチェンジ",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 87
        },
        {
            "ID": 88,
            "Year": 2024,
            "Group1": "東京設計センター",
            "Group2": "東京第2G",
            "Group3": "第１・２T",
            "Name": "ENE's",
            "Description": null,
            "IsPartOfQuantityTotal": 1,
            "IsPartOfAmountTotal": 1,
            "Condition1": null,
            "Condition2": null,
            "Condition3": null,
            "UnitPrice": 0.00,
            "SortOrder": 88
        }
    ]
);
const dataArc1 = {
    num: 2654,
    title: '预算栋数',
    endAngle: 340,
    color: "#488EF7",
};
const dataArc2 = {
    num: 2510,
    title: '依赖栋数',
    endAngle: 290,
    color: "#F2B564",
};
const dataArc3 = {
    num: 1200,
    title: '纳品栋数',
    endAngle: 250,
    color: "#F2B564",
};
const dataArc4 = {
    num: "45%",
    title: '予算比率',
    endAngle: 270,
    color: "#F2B564",
};

const dataCard1 = {
    num: 680,
    title: '依赖前'
};

const dataCard2 = {
    num: 460,
    title: '今日的受信'
};
const dataCard3 = {
    num: 120,
    title: '保留'
};
const dataCard4 = {
    num: 67,
    title: '依赖中'
};
const dataCard5 = {
    num: 87,
    title: '戻り残'
};
const dataCard6 = {
    num: 24,
    title: '返却'
};
const dataCard7 = {
    num: 456,
    title: '依赖中'
};
</script>

<style scoped>
.fullscreen-div {
    width: 100vw;
    height: 100vh;
    background-color: #04091F;
    display: flex;
    color: #fff;
}

.left,
.center,
.right {
    display: flex;
    flex-direction: column;
    margin: 17px 0px 17px 17px;
    /* border: 1px solid #ccc; */
}

.left {
    flex: 43;
}

.center {
    flex: 59;
}

.right {
    flex: 40;
    margin-right: 20px;
}

.left1 {

    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../accsets/img/left1.png');
}

.t-l-column1,
.t-l-column2,
.t-l-column3,
.t-l-column4 {
    width: 99%;
    height: 100%;
    border-width: 0px;
    border-color: #fff;
    border-style: solid;
}

.t-l-column1 {
    flex: 34
}

.t-l-column2 {
    flex: 80;
    justify-content: space-between;
}

.t-l-column3 {
    flex: 50;

}

.column-flex-row {
    display: flex;
    flex: 1;
    flex-direction: row;
}



.t-l-column4 {
    flex: 380
}

.flex-column {
    display: flex;
    flex-direction: column;
}

.center1,
.center2,
.center3 {
    margin-top: 0px;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.right1,
.right2,
.right3 {
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.center1 {
    flex: 55;
    font-size: 2.7rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../accsets/img/title.png');

}

.flex-row {
    display: flex;
    flex-direction: row;

}

.center2 {
    flex: 78;

    justify-content: space-between;
}

.t-c-2 {
    flex: 1;
    margin: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../accsets/img/number.png');
}

.center3 {
    flex: 360;
    margin-top: 7px;
    background-image: url('../accsets/img/map.png');
}


.right1 {
    flex: 55;
    font-size: 1.5rem;
    font-weight: bold;
    color: #71FDF8;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../accsets/img/time.png');
}

.right2 {
    flex: 160;
    margin-top: 7px;
    background-image: url('../accsets/img/module.png');
}

.right3 {
    flex: 290;
    margin-top: 7px;
    background-image: url('../accsets/img/module.png');
}

.top,
.bottom {
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.top {
    flex: 53;
}

.bottom {
    flex: 23;
    margin-top: 13px;
    background-image: url('../accsets/img/module.png');
}
</style>
