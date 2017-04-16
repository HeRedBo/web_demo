<?php

function myScandir($dir)
{
    
    $files = array();
    static $id;
    if(is_dir($dir)){
        //打开文件目录 得到目录的资源对象
        if($tmp  = opendir( $dir ))
        {
            //遍历并判断
            while ($file = readdir( $tmp ))
            {
                
                if($file != '.' && $file != "..")
                {
                    $id ++;
                    if(is_dir( $dir . "/" . $file))
                    {
                        $files[] = [
                            'id'    => $id,
                            'name'  => $file,
                            'children' => myScandir($dir."/".$file)
                        ];
                        
                    }
                    else
                    {
                        $files[]= [
                            'id' => $id,
                            'name' => $file,
                        ];
                    }
                }
            }
            //文件遍历结束
            closedir($tmp);
            return $files;
        }
    }
}
	
$dir = 'D:/home/logs';
$dirs = myScandir($dir);
echo json_encode($dirs);
