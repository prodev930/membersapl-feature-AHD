import {useState, useCallback, useEffect} from 'react';
import {
  GlobalService,
  finishTask,
  getListTask,
  saveTask,
  updateTask,
} from '@services';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import {useSelector} from 'react-redux';

const taskStatus = {
  STATUS_NOT_START: 0,
  STATUS_IN_PROGRESS: 1,
  STATUS_DONE: 2,
  STATUS_CONFIRMATION: 3,
  STATUS_BEFORE: 4,
};

export const useFunction = (idRoom_chat: string) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isShowTaskCreateForm, setIsShowTaskCreateForm] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const [reload, setReload] = useState(false);
  const idCompany = useSelector((state: any) => state.chat.idCompany);

  const [listTask, setList] = useState<any[]>([]);
  const [specificItem, setSpecificItem] = useState<any>(null);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState<number | null>(null);

  const toggleShowTaskCreateForm = () => setIsShowTaskCreateForm(prev => !prev);

  const callApiSearch = useCallback(
    async (params: any) => {
      try {
        GlobalService.showLoading();
        const res = await getListTask(params);

        setLastPage(res?.data?.tasks?.last_page);
        setList(
          params?.page === 1
            ? res?.data?.tasks?.data
            : listTask.concat(res?.data?.tasks?.data),
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        GlobalService.hideLoading();
      }
    },
    [listTask],
  );

  useEffect(() => {
    if (page && page !== currentPage) {
      setCurrentPage(page);
      const params = {
        page: page,
        idCompany: idCompany,
        idRoomChat: idRoom_chat,
      };
      callApiSearch(params);
    }
  }, [page, currentPage, callApiSearch, idCompany, idRoom_chat]);

  const resetGetListTaskParams = () => {
    setPage(1);
    setCurrentPage(null);
  };

  const handleLoadMore = useCallback(() => {
    if (page < lastPage) {
      setPage(prevPage => prevPage + 1);
    }
  }, [page, lastPage]);

  const onRefresh = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const onFinishTask = useCallback(
    async input => {
      if (reload) {
        return;
      }
      setReload(true);
      const data = {
        ...input,
        stat: taskStatus.STATUS_DONE,
      };
      const res = await finishTask(data);
      if (res.data?.errors) {
        showMessage({
          message: res.data?.errors
            ? JSON.stringify(res.data?.errors)
            : 'Network Error',
          type: 'danger',
        });
      } else {
        showMessage({
          message: '保存しました。',
          type: 'success',
        });
        setPage(1);
        setCurrentPage(null);
      }
      setReload(false);
    },
    [reload, setReload],
  );

  const onUpdateTask = useCallback(
    async data => {
      if (reload) {
        return;
      }
      setReload(true);
      setShowTaskForm(false);
      const res = await updateTask(data);
      if (res.data?.errors) {
        showMessage({
          message: res.data?.errors
            ? JSON.stringify(res.data?.errors)
            : 'Network Error',
          type: 'danger',
        });
      } else {
        showMessage({
          message: '保存しました。',
          type: 'success',
        });
      }
      setReload(false);
    },
    [reload],
  );

  const onSaveTask = useCallback(async input => {
    const data = {
      project_id: 1,
      item_id: 1,
      task_name: input.taskName,
      actual_start_date: moment().format('YYYY/MM/DD'),
      actual_start_time: '00:00:00',
      actual_end_date: moment(input.date).format('YYYY/MM/DD'),
      actual_end_time: input.time,
      plans_end_date: input.date,
      plans_end_time: input.time,
      plans_time: 0,
      actual_time: 0,
      plans_cnt: 0,
      actual_cnt: 0,
      cost: 0,
      task_person_id: input.selected,
      description: input.taskDescription,
      cost_flg: 0,
      remaindar_flg: 0,
      repeat_flag: 0,
      gcalendar_flg: input.isGoogleCalendar,
      all_day_flg: input.isAllDay,
      chat_room_id: input.chat_room_id,
    };
    const res = await saveTask(data);

    if (res.data?.errors) {
      showMessage({
        message: res.data?.errors
          ? JSON.stringify(res.data?.errors)
          : 'Network Error',
        type: 'danger',
      });
    } else {
      showMessage({
        message: '保存しました。',
        type: 'success',
      });
      resetGetListTaskParams();
    }
    setIsShowTaskCreateForm(false);
  }, []);

  return {
    setShowTaskForm,
    showTaskForm,
    onUpdateTask,
    selected,
    setSelected,
    reload,
    setReload,
    onSaveTask,
    isShowTaskCreateForm,
    setIsShowTaskCreateForm,
    onFinishTask,
    setSpecificItem,
    specificItem,
    onRefresh,
    handleLoadMore,
    resetGetListTaskParams,
    listTask,
    toggleShowTaskCreateForm,
  };
};
