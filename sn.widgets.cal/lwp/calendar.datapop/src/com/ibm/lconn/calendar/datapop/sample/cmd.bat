@REM ***************************************************************** 
@REM                                                                   
@REM IBM Confidential                                                  
@REM                                                                   
@REM OCO Source Materials                                              
@REM                                                                   
@REM Copyright IBM Corp. 2011, 2012                                    
@REM                                                                   
@REM The source code for this program is not published or otherwise    
@REM divested of its trade secrets, irrespective of what has been      
@REM deposited with the U.S. Copyright Office.                         
@REM                                                                   
@REM ***************************************************************** 

java -cp .;calendar.datapop.jar;jdom1.0.jar;commons-codec-1.3-minus-mp.jar;commons-math-1.2.jar;PdfGenerator.jar;log4j-1.2.11.jar;commons-httpclient-3.0.jar;commons-logging-1.0.4.jar;lc.util.base-3.0.jar com.ibm.lconn.calendar.datapop.PopulationEngine --file=D:\temp\calendar.datapop.xml --thread=2