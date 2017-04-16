<?php
class ajaxData
{
	protected $filepath; // 文件名称
	protected $fileLineCount; // 文件数量


	public function __construct($filepath = '')
	{
		$this->filepath = $filepath;
		$this->fileCountLine();
	}

	/**
	 * 获取文件行数
	 * @param  string $filepath 文件路径
	 * @return int 返回文件的总行数
	 */
	public function getFileLineCount($filepath = '')
	{
		$filepath = $filepath ?: $this->filepath;
		if(!$this->fileLineCount)
			$this->fileCountLine($filepath);
		return $this->fileLineCount;
	}

	/**
	 * 获取指定文件的页数内容
	 * @param  string  $filepath 文件路径
	 * @param  integer $page     页码
	 * @return array
	 */
	public function getFileContents($filepath = '', $page = 1, $pageSize = 100)
	{
		$filepath      = $filepath ?: $this->filepath;
		$fileLineCount = $this->getFileLineCount($filepath);
		$pageCount     = ceil($fileLineCount / $pageSize);
		$limit         = $this->getSearchLimit($page, $pageSize);
		$response = [
			"total" 		=> $fileLineCount,
	        "per_page"  	=> $pageSize,
	        "total_page" 	=> $pageCount,
	        "current_page" 	=> $page,
	        "from"  		=> $limit['start'],
	        "to"  			=> $limit['end'],
	        'data' 			=> [],
		];

		if($page <= $pageCount)
			$response['data'] = $this->getFileLines($filepath,$limit['start'],$limit['end']);

		return $response;
	}


	/**
	 * 获取文件的查询限制条件
	 * @param  integer $page     页码
	 * @param  integer $pageSize  
	 * @return [type]            [description]
	 */
	protected function getSearchLimit($page, $pageSize)
	{
		$start = (($page -1) * $pageSize ) + 1;
		$end   =  $page * $pageSize;
		return compact('start','end');
	}

	/**
	 * 获取指定文件的指定行数数据
	 * @param  string  $filename  文件名
	 * @param  integer $startLine 开始行数
	 * @param  integer $endLine   结束行数
	 * @param  string  $method    文件读取模式
	 * @return array 
	 */
	public function getFileLines($filename, $startLine = 1, $endLine=50, $method='rb') 
	{
	    $content = array();
	    $count   = $endLine - $startLine;
	    $id      = $startLine;
	    if(version_compare(PHP_VERSION, '5.1.0', '>='))
	    {
	        $fp = new SplFileObject($filename, $method);
	        $fp->seek($startLine-1);/* 转到第N行, seek方法参数从0开始计数 */
	        for($i = 0; $i <= $count; ++$i) 
	        {
	        	//var_dump($fp->current());
	        	$data = $fp->current();
	        	$content[] = [
	        		'id' => $id,
	        		'content' => $fp->current() /* current()获取当前行内容 */
	        	];
	         	
	            $fp->next(); /* 下一行 */
	            $id ++;
	        }
	   }
	   else
	   {
	   		/*PHP<5.1 */
	        $fp = fopen($filename, $method);
	        if(!$fp) return 'error:can not read file';
	        for ($i=1;$i<$startLine;++$i) 
	        {
	        	/* 跳过前$startLine行 */
	            fgets($fp);
	        }
	        for($i;$i<=$endLine;++$i)
	        {
	        	$content[] = [
	        		'id' => $id,
	        		'content' => fgets($fp)/* 读取文件行内容 */
	        	];
	            // $content[$id] = fgets($fp);/* 读取文件行内容 */
	            $id ++;
	        }
	        fclose($fp);
	    }
	    return array_filter($content); /* array_filter过滤：false,null,'' */
	}

	/**
	 * 获取文件总行数
	 * @param  string $filepath 文件名
	 * @return void
	 */
	protected function fileCountLine($filepath ='')
	{
		$filepath = $filepath ?: $filepath;
		if(file_exists($filepath))
		{
			ini_set("memory_limit ", '200M');
			$fp = fopen($filepath,'r');
			$i = 0;
			while (!feof($fp))
			{
				//每次读取4M
				if($data = fread($fp, 1024 * 1024 * 4))
				{
					$num = substr_count($data, "\n");
					$i   += $num;
				}
			}
			fclose($fp);

			$this->fileLineCount = $i;
			return $i;
		}
		return false;
	}
}

$filepath = 'D:\home\logs\Api\2017-03-18\ApiRequest.log';
$ajaxdata = new ajaxData($filepath);
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$data = $ajaxdata->getFileContents('',$page);
echo json_encode($data);

