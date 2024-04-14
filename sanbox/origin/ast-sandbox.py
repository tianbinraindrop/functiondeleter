from pandas import DataFrame
from connectioneditor.action_db import *
import pandas


class action_demo1():

    def __init__(self) -> None:
        self.pg = con_postgresql()
        self.conn = self.pg.connect()
        self.tablename = 'vimtips'


class action_demo2():

    def __init__(self) -> None:
        self.pg = con_postgresql()
        self.conn = self.pg.connect()
        self.tablename = 'vimtips'


class action_demo3():

    class nested_class():

        def add(a, b):
            return a + b

    def fundemo():
        print('here is me')


class action_vim():

    def __init__(self) -> None:
        self.pg = con_postgresql()
        self.conn = self.pg.connect()
        self.tablename = 'vimtips'

    def actiontypelist(self) -> list:
        """
        列出出现过的actiontype名称
        Returns:
            list: 出现过的actiontype名称列表
        """
        sql = f"""SELECT actiontype,count(actiontype) as ct from {self.tablename} group by actiontype order by ct desc"""
        listpd = self.pg.query(sql)
        return listpd.actiontype.values.tolist()

    def modelist(self) -> list:
        """
        列出出现过的mode名称
        Returns:
            list: 出现过的mode名称列表
        """
        sql = f"""SELECT mode,count(mode) as ct from {self.tablename} group by mode order by ct desc"""
        listpd = self.pg.query(sql)
        # mode是pandas的关键字，所以这里要用listpd['mode']
        return listpd['mode'].values.tolist()

    def add(self, operation: str, mode: str, frequency: str, hard: str,
            vscode: bool, instructions: str, memo: str, actiontype: str):
        """
        增加一条vim记录
        """
        # sql语句不认识'，所以要替换成"
        memo = memo.replace("'", '"')
        instructions = instructions.replace("'", '"')
        operation = operation.strip()
        instructions = instructions.strip()
        memo = memo.strip()

        sql = f"""insert into {self.tablename} (operation,mode,frequency,hard,vscode,instructions,memo,actiontype) values ('{operation}','{mode}','{frequency}','{hard}','{vscode}','{instructions}','{memo}','{actiontype}') """
        self.pg.execute(sql)

    def update(self, id: str, operation: str, mode: str, frequency: str,
               hard: str, vscode: bool, instructions: str, memo: str,
               actiontype: str):
        """
        修改一条vim记录

        Args:
        """
        sql = f"""update {self.tablename} set operation = '{operation}', mode ='{mode}',frequency='{frequency}',hard='{hard}',vscode='{vscode}',instructions='{instructions}',memo='{memo}',actiontype='{actiontype}' where id={id} """
        self.pg.execute(sql)

    def all(self, orderby: str = "id", OrderDirect: bool = True) -> DataFrame:
        """
        排序返回所有数据记录
        Args:
            orderby (str): 排序字段
            OrderDirect (bool): 是否降序
        Returns:
            DataFrame: 返回所有数据记录
        """
        if OrderDirect:
            sqlstr = f"""select id,operation,mode,frequency,hard,vscode,instructions,memo,actiontype from {self.tablename} order by {orderby} desc """
        else:
            sqlstr = f"""select id,operation,mode,frequency,hard,vscode,instructions,memo,actiontype from {self.tablename} order by {orderby} """

        return self.pg.query(sqlstr)

    def query(self, sql: str) -> DataFrame:
        """
        查询数据

        Args:
            sql (str): sql语句

        Returns:
            DataFrame: 结果集
        """
        return self.pg.query(sql)

    def remove(self, colname: str, value: str):
        """
        删除指定的记录

        Args:
            colname (str): [列名]
            value (str): [判断的值]
        """
        sqlstr = f"""delete from {self.tablename} where {colname } = '{value}' """
        self.pg.execute(sqlstr)

    def get(self, colname: str, value: str) -> tuple:
        """
        获得指定的记录

        Args:
            colname (str): [列名]
            value (str): [判断的值]
        Returns:
            tuple: 返回记录
        """
        sqlstr = f"""select id,operation,mode,frequency,hard,vscode,instructions,memo,actiontype from {self.tablename} where {colname } = '{value}' """
        return self.pg.fetch(sqlstr)
