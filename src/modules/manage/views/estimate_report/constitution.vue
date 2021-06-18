<template>
  <div>
    <match-exception
      v-if="view == 1"
      :exception="currentUnMatchData"
      @close="handleClose">
    </match-exception>
            <el-table
              ref="table"
              class="has-expand-table"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :row-key="getRowKeys"
              @expand-change="handleExpandChange"
              align="center"
              :data="tables">
              <el-table-column type="expand" width="1" class-name="hide-expand-column">
                <el-table :data="expandData.list" class="expand-table">
                  <el-table-column
                    label="异常名称"
                    prop="abnormalName"
                    align="center">
                  </el-table-column>
                  <el-table-column label="操作" prop="index" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="$router.push(
                        `/basic_data/unusual_list/create?name=${scope.row.abnormalName}`)">
                        新增
                      </el-button>
                      <span>|</span>
                      <el-button type="text" @click="handleMatch(scope.row)">匹配</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-table-column>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column label="体检编号" prop="reportNo" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="姓名" prop="clientName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="clientName"
                        @click="commonHref.toPersonalHealth(scope.row.clientId, $router)">
                    {{ scope.row.clientName || '-'}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="性别" prop="genderTxt" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="年龄" prop="age" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="人员类别"
                prop="gradeName"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="单位"
                prop="workUnitName"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="体检日期" prop="reportDate" min-width="90" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type='text'
                    size="small"
                    @click="openPdf(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right">
              <el-pagination
                style="margin-top: 15px"
                background
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
                :page-sizes="[15]"
                :current-page="table.pageNo"
                :page-size="table.pageSize"
                layout="prev, pager, next, jumper, total, sizes"
                :total="table.total"
              ></el-pagination>
            </div>
          </div>
</template>

<script>
import MatchException from './match_exception.vue';
export default {
  name: 'Comment',
  props: ['tables'],
  components: {
    MatchException,
  },
  data() {
    return {
      view: '',
      currentUnMatchData: {},
      table: {
        list: [],
        pageSize: 15,
        pageNo: 1,
        total: 0,
      },
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    // 查看pdf
    openPdf(data) {
      window.open(data.assessReportName);
    },
    handleMatch(data) {
      this.view = 1;
      this.currentUnMatchData = data;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
