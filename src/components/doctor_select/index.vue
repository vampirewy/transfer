<template>
  <div class="doctor-select-component">
    <el-dialog
            v-if="mode === 'dialog'"
            title="选择医生"
            :visible.sync="visible"
            @close="cancel"
            class="doctor-select"
            :modal-append-to-body="false"
    >
      <div class="dialog-header-content">
        <div>已选择:</div>
        <el-tag
                class="header-content-tags"
                v-for="row in userList"
                closable
                @close="handleClose(row)"
                :key="row.id"
        >
          {{ row.realName }}
        </el-tag>
      </div>
      <el-input
              placeholder="请输入姓名/角色名进行搜索"
              v-model="params.keyword"
              style="width: 100%; margin-bottom: 12px"
      >
        <el-button
                slot="append"
                icon="el-icon-search"
                type="primary"
                @click="search()"
        ></el-button>
      </el-input>
      <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
      >
        <el-tab-pane label="管理医生" name="first">
          <el-table
                  class="openTable"
                  ref="doctorTable1"
                  :data="dataSource"
                  highlight-current-row
                  @select="handleSelect"
          >
            <el-table-column v-if="isRadio" width="38">
              <template slot-scope="scope">
                <el-radio
                        v-model="params.currentRow"
                        :label="scope.row"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column v-else width="55">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.selected"
                  @change="ev => onChange(1, scope.row, ev)"
                  :indeterminate="false"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column property="realName" label="姓名"> </el-table-column>
            <el-table-column property="roleName" label="角色"></el-table-column>
            <el-table-column property="roleName" label="简介">
              <template slot-scope="scope">
                <p class="textarea">
                  {{ scope.row.introduction }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="search"
                    @size-change="handleSizeChange"
                    background
                    layout=" prev, pager, next, jumper, total, sizes"
                    :current-page="params.pageNo"
                    :total="params.total"
                    :page-size="params.pageSize"
                    :page-sizes="[5]"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工作室" name="second" v-if="isSunEnter">
          <el-table
                  @select="handleSelect"
                  :data="dataSourceWork"
                  highlight-current-row ref="table">
            <el-table-column v-if="isRadio" width="55">
              <template slot-scope="scope">
                <el-radio
                        v-model="params.currentRow"
                        :label="scope.row"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column v-else width="55">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.selected"
                  @change="ev => onChange(2, scope.row, ev)"
                  :indeterminate="false"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column property="name" label="工作室名称">
            </el-table-column>
            <el-table-column property="summary" label="简介">
              <template slot-scope="scope">
                <p class="textarea">
                  {{ scope.row.summary }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="search"
                    @size-change="handleSizeChange"
                    background
                    layout=" prev, pager, next, jumper, total, sizes"
                    :current-page="params.pageNo"
                    :total="params.totalWork"
                    :page-size="params.pageSize"
                    :page-sizes="[5]"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button class="cancelBtn" @click="cancel">取 消</el-button>
        <el-button class="sureBtn" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <div v-else class="doctor-select">
        <div class="dialog-header-content">
            <div>已选择:</div>
            <el-tag
                    closable
                    :key="row.id"
                    class="header-content-tags"
                    v-for="row in userList"
                    @close="handleClose(row)"
            >
                {{ row.realName }}
            </el-tag>
        </div>
      <el-input
              placeholder="请输入姓名/角色名进行搜索"
              v-model="params.keyword"
              style="width: 100%; margin-bottom: 12px"
      >
        <el-button
                slot="append"
                icon="el-icon-search"
                type="primary"
                @click="search()"
        ></el-button>
      </el-input>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="管理医生" name="first">
          <el-table
                  class="openTable"
                  ref="doctorTable2"
                  :data="dataSource"
                  highlight-current-row
                  @select="handleSelect"
          >
            <el-table-column v-if="isRadio" width="38">
              <template slot-scope="scope">
                <el-radio
                        v-model="params.currentRow"
                        :label="scope.row"
                         @change="ev => onChange(1, scope.row, ev)"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column v-else width="55">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.selected"
                  @change="ev => onChange(1, scope.row, ev)"
                  :indeterminate="false"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column property="realName" label="姓名"> </el-table-column>
            <el-table-column property="roleName" label="角色"></el-table-column>
            <!-- <el-table-column property="department" label="科室/部门">
              <template slot-scope="scope">
                <p class="textarea">
                  {{ scope.row.department || '-'}}
                </p>
              </template>
            </el-table-column> -->
            <el-table-column property="roleName" label="简介">
              <template slot-scope="scope">
                <p class="textarea">
                  {{ scope.row.introduction }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="search"
                    @size-change="handleSizeChange"
                    background
                    layout=" prev, pager, next, jumper, total, sizes"
                    :current-page="params.pageNo"
                    :total="params.total"
                    :page-size="params.pageSize"
                    :page-sizes="[5]"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="工作室" name="second">
          <el-table
                  :data="dataSourceWork"
                  highlight-current-row ref="table"
                  @select="handleSelect"
          >
            <el-table-column v-if="isRadio" width="55">
              <template slot-scope="scope">
                <el-radio
                        v-model="params.currentRow"
                        :label="scope.row"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column v-else width="55">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.selected"
                  @change="ev => onChange(2, scope.row, ev)"
                  :indeterminate="false"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column property="name" label="工作室名称">
            </el-table-column>
            <el-table-column property="summary" label="简介">
              <template slot-scope="scope">
                <p class="textarea">
                  {{ scope.row.summary }}
                </p>
              </template>
            </el-table-column>
          </el-table>

          <div style="text-align: right">
            <el-pagination
                    style="margin-top: 15px"
                    @current-change="search"
                    @size-change="handleSizeChange"
                    background
                    layout=" prev, pager, next, jumper, total, sizes"
                    :current-page="params.pageNo"
                    :total="params.totalWork"
                    :page-size="params.pageSize"
                    :page-sizes="[5]"
            ></el-pagination>
          </div>
        </el-tab-pane> -->
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button class="cancelBtn" @click="cancel">取 消</el-button>
        <el-button class="sureBtn" type="primary" @click="submit">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'doctor-select',
  props: {
    mode: {
      type: String,
      default: 'dialog', // dialog normal
    },
    isRadio: {
      type: Boolean,
      default: true,
    },
    selectedDoctor: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedDoctorIds: {
      type: Array,
      default() {
        return [];
      },
    },
    visible: Boolean,
    clientId: String,
    isSunEnter: Boolean,
  },
  data() {
    return {
      userList: [],
      dataSource: [],
      dataSourceWork: [],
      activeName: 'first',
      tableSelected: [], //
      params: {
        pageNo: 1,
        pageSize: 5,
        total: 0,
        totalWork: 0,
        keyword: '',
        currentRow: {},
        current: '',
      },
    };
  },
  methods: {
    handleSelect(value, row) {
      const ids = this.userList.map(user => user.id);
      const findIndex = ids.indexOf(row.id);
      if (findIndex > -1) this.userList.splice(findIndex, 1);
      else this.userList.push(row);
    },
    async searchDoctor(selectedDoctorIds = []) {
      const selectedUserIdsStr = selectedDoctorIds.join(',');
      const res = await this.$api.userManagerInterface.searchDoctor({
        ...this.params,
        selectedUserIds: selectedUserIdsStr,
        type: this.type,
      });
      const { data } = res.data;
      this.dataSource = data.data || [];
      this.params.total = data.total;
      this.$nextTick(() => {
        this.dataSource.forEach((row) => {
          const val = row;
          if (this.userList.map(it => it.id).includes(val.id)) {
            val.selected = true;
            // 单选
            this.params.currentRow = val;
          } else {
            val.selected = false;
          }
        });
      });
    },
    handleClose(row) {
      const rowId = row.id;
      this.userList = this.userList.filter(item => item.id !== rowId);
      const item = this.dataSource.find(it => it.id === rowId);
      const item1 = this.dataSourceWork.find(t => t.id === rowId);
      if (item) {
        item.selected = false;
      }
      if (item1) {
        item1.selected = false;
      }
    },
    handleClick() {
      this.search();
      this.searchDoctor(this.selectedDoctorIds);
    },
    search(target) {
      if (this.activeName === 'first') {
        this.params.pageNo = target;
        this.searchDoctor(this.selectedDoctorIds);
      } else {
        this.fetchWorkhomeList(target);
      }
    },

    fetchWorkhomeList(current = 1) {
      console.log('this.params', this.params);
      this.params.pageNo = current;
      this.$api.userManagerInterface
        .getWorkhomes({ ...this.params, clientId: this.clientId })
        .then(({ data }) => {
          console.log(data, 258);
          if (data.code === 200) {
            data.data.data.forEach((t) => {
              const val = t;
              if (this.userList.map(it => it.id).includes(val.id)) {
                val.selected = true;
              } else {
                val.selected = false;
              }
            });
            this.dataSourceWork = data.data.data;
            this.params.totalWork = data.data.total;
          }
        });
    },
    onChange(type, scope, ev) {
      const s = scope;
      if (ev) {
        if (!this.isSunEnter) {
          this.userList = [scope];
          this.dataSource.forEach((item) => {
            if (item.id !== scope.id) {
              item.selected = false;
            }
          });
          return;
        }
        if (type === 1) {
          s.selectType = 1;
        }
        if (type === 2) {
          s.realName = scope.name;
          s.selectType = 2;
        }
        if (this.isRadio) {
          this.userList = [scope];
        } else {
          this.userList.push(scope);
        }
      } else {
        const idx = this.userList.findIndex(it => it.id === scope.id);
        this.userList.splice(idx, 1);
      }
    },
    fetchDoctorList(current = 1) {
      this.params.pageNo = current;
      this.$api.userManagerInterface
        .getDoctors(this.params)
        .then(({ data }) => {
          if (data.code === 200) {
            const { list, total } = data.data;
            this.dataSource = list;
            this.params.total = total;
          }
        });
    },

    handleSizeChange(size) {
      this.params.pageSize = size;
      this.searchDoctor(this.selectedDoctorIds);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      const userList = this.isRadio
        ? (this.params.currentRow.id ? [this.params.currentRow] : [])
        : this.userList;
      this.$emit('change', userList);
    },
  },
  watch: {
    visible(next) {
      if (next) {
        this.search();
      } else {
        this.activeName = 'first';
      }
    },
  },
  mounted() {
    this.userList = this.selectedDoctor;
    console.log('userList', this.userList);
    this.searchDoctor(this.selectedDoctorIds);
  },
};
</script>

<style lang="scss" scoped>
  .dialog-header-content {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }

  .header-content-tags {
    margin: 0 10px;
  }

  .doctor-select-component {
    /deep/.el-tabs__item.is-active {
      color: #3154AC !important;
    }
    /deep/.el-tabs__item {
      color: #97A6BD !important;
    }
      /deep/.el-tag {
          white-space: normal;
      }
  }

.doctor-select .el-input-group__append {
  background-color: #4991fd;
  color: #fff;
}

.textarea {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dialog-footer {
  padding: 10px 15px 10px 0;
  text-align: center;
}
</style>
